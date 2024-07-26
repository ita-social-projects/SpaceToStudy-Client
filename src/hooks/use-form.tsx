import React, { useState } from 'react'
import {
  FormNonInputValueChange,
  UseFormErrors,
  UseFormEventHandler,
  UseFormValidations
} from '~/types'
import { getEmptyValues } from '~/utils/helper-functions'
import { isEqual } from '~/utils/isEqual'

interface UseFormProps<T> {
  initialValues: T
  initialErrors?: UseFormErrors<T>
  validations?: Partial<UseFormValidations<T>>
  onSubmit?: (data?: T) => Promise<void> | void
  submitWithData?: boolean
}

interface UseFormOutput<T> {
  data: T
  isDirty: boolean
  errors: UseFormErrors<T>
  handleInputChange: UseFormEventHandler<T, React.ChangeEvent<HTMLInputElement>>
  handleNonInputValueChange: FormNonInputValueChange<T[keyof T], T>
  handleBlur: UseFormEventHandler<T, React.FocusEvent<HTMLInputElement>>
  handleErrors: (key: keyof T, error: string) => void
  handleSubmit: (event: React.FormEvent<HTMLDivElement>) => void
  resetData: (keys?: (keyof T)[]) => void
  resetErrors: () => void
  handleDataChange: <K extends object>(newData: K) => void
}

export const useForm = <T extends object>({
  initialValues,
  initialErrors = getEmptyValues(initialValues, ''),
  validations,
  onSubmit,
  submitWithData
}: UseFormProps<T>): UseFormOutput<T> => {
  const [data, setData] = useState<T>(initialValues)
  const [isDirty, setIsDirty] = useState<boolean>(false)
  const [errors, setErrors] = useState<UseFormErrors<T>>(initialErrors)
  const [isTouched, setIsTouched] = useState<Record<keyof T, boolean>>(
    getEmptyValues(initialValues, false)
  )

  const validateValue = (key: keyof T, value: T[keyof T] | string) => {
    if (validations && validations[key]) {
      return validations[key]?.(value, data)
    }
  }

  const checkForError = <K extends keyof T>(key: K, value: T[K] | string) => {
    if (isTouched[key] || errors[key]) {
      const valid = validateValue(key, value)

      setErrors((prev) => ({
        ...prev,
        [key]: valid ?? ''
      }))
    }
  }

  const handleInputChange =
    (key: keyof T) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value
      setData((prev) => {
        const newData = {
          ...prev,
          [key]: value
        }
        setIsDirty(!isEqual(newData, initialValues))
        return newData
      })
      checkForError(key, event.target.value)
    }

  const handleNonInputValueChange = <K extends keyof T>(
    key: K,
    value: T[K]
  ) => {
    setData((prev) => {
      const newData = {
        ...prev,
        [key]: value
      }
      setIsDirty(!isEqual(newData, initialValues))
      return newData
    })
    checkForError(key, value)
  }

  const handleErrors = (key: keyof T, error: string) => {
    setErrors((prev) => ({
      ...prev,
      [key]: error
    }))
  }

  const handleBlur =
    (key: keyof T) => (event: React.FocusEvent<HTMLInputElement>) => {
      setIsDirty(!isEqual(data, initialValues))

      const valid = validateValue(key, event.target.value)

      setErrors((prev) => ({
        ...prev,
        [key]: valid ?? ''
      }))
      setIsTouched((prev) => ({
        ...prev,
        [key]: true
      }))
    }

  const handleSubmit = (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault()
    let isValid = true
    const submittedData = submitWithData ? data : undefined
    const newErrors = { ...errors }

    if (validations) {
      for (const key in validations) {
        const value = data[key]
        const validation = validateValue(key, value)
        if (validation) {
          isValid = false
          newErrors[key] = validation
        }
      }
    }

    isValid ? onSubmit && void onSubmit(submittedData) : setErrors(newErrors)
  }

  const resetData = (keys: (keyof T)[] = []) => {
    setData((prev) => {
      if (keys.length === 0) return initialValues

      const newData = { ...prev }

      keys.forEach((key) => {
        newData[key] = initialValues[key]
      })

      return newData
    })
  }

  const resetErrors = () => {
    setErrors(initialErrors)
  }

  const handleDataChange = <K extends object>(newData: K) => {
    const filteredNewData = Object.keys(newData).reduce((acc, key) => {
      if (Object.prototype.hasOwnProperty.call(initialValues, key)) {
        return { ...acc, [key]: newData[key as keyof K] }
      }
      return acc
    }, {} as Partial<T>)

    setData((prev) => ({
      ...prev,
      ...filteredNewData
    }))
  }

  return {
    data,
    isDirty,
    errors,
    handleDataChange,
    handleInputChange,
    handleNonInputValueChange,
    handleBlur,
    handleErrors,
    handleSubmit,
    resetData,
    resetErrors
  }
}

export default useForm
