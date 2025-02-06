import React, { useCallback, useEffect, useMemo, useState } from 'react'
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
  isValid: boolean
  errors: UseFormErrors<T>
  trigger: (key?: keyof T | (keyof T)[]) => boolean
  handleInputChange: UseFormEventHandler<T, React.ChangeEvent<HTMLInputElement>>
  handleNonInputValueChange: FormNonInputValueChange<T[keyof T], T>
  handleBlur: UseFormEventHandler<T, React.FocusEvent<HTMLInputElement>>
  handleErrors: (key: keyof T, error: string) => void
  handleSubmit: (event?: React.FormEvent<HTMLDivElement>) => void
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
  const [isFormValid, setIsFormValid] = useState<boolean>(true)
  const [errors, setErrors] = useState<UseFormErrors<T>>(initialErrors)
  const [isTouched, setIsTouched] = useState<Record<keyof T, boolean>>(
    getEmptyValues(initialValues, false)
  )

  useEffect(() => {
    setIsFormValid(!Object.values(errors).some((error) => error))
  }, [errors])

  const validateValue = useCallback(
    (key: keyof T, value: T[keyof T] | string) => {
      if (validations && validations[key]) {
        return validations[key]?.(value, data)
      }
    },
    [data, validations]
  )

  const checkForError = useCallback(
    <K extends keyof T>(key: K, value: T[K] | string) => {
      if (isTouched[key] || errors[key]) {
        const valid = validateValue(key, value)

        setErrors((prev) => ({
          ...prev,
          [key]: valid ?? ''
        }))
      }
    },
    [errors, isTouched, validateValue]
  )

  const handleInputChange = useCallback(
    (key: keyof T) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const nameRegex = /[^a-zA-Z\u0400-\u04FF'\- ]/g

      let value =
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value

      if (
        (key === 'firstName' || key === 'lastName') &&
        typeof value === 'string'
      ) {
        value = value.replace(nameRegex, '')
      }

      setData((prev) => {
        const newData = {
          ...prev,
          [key]: value
        }
        setIsDirty(!isEqual(newData, initialValues))
        return newData
      })
      checkForError(key, event.target.value)
    },
    [checkForError, initialValues]
  )

  const handleNonInputValueChange = useCallback(
    <K extends keyof T>(key: K, value: T[K]) => {
      setData((prev) => {
        const newData = {
          ...prev,
          [key]: value
        }
        setIsDirty(!isEqual(newData, initialValues))
        return newData
      })
      checkForError(key, value)
    },
    [checkForError, initialValues]
  )

  const handleErrors = useCallback((key: keyof T, error: string) => {
    setErrors((prev) => ({
      ...prev,
      [key]: error
    }))
  }, [])

  const handleBlur = useCallback(
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
    },
    [data, initialValues, validateValue]
  )
  const handleSubmit = useCallback(
    (event?: React.FormEvent<HTMLDivElement>) => {
      event?.preventDefault()
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
    },
    [data, errors, onSubmit, submitWithData, validateValue, validations]
  )

  const trigger = useCallback(
    (key?: keyof T | (keyof T)[]): boolean => {
      if (!validations) return true

      let fieldNames: (keyof T)[]

      if (key) {
        fieldNames = Array.isArray(key) ? key : [key]
      } else {
        fieldNames = Object.keys(validations) as (keyof T)[]
      }

      let isValid = true

      fieldNames.forEach((field) => {
        const validation = validateValue(field, data[field])
        if (validation) {
          isValid = false
          setErrors((prev) => ({
            ...prev,
            [field]: validation
          }))
        }
      })

      return isValid
    },
    [data, validateValue, validations]
  )

  const resetData = useCallback(
    (keys: (keyof T)[] = []) => {
      setData((prev) => {
        if (keys.length === 0) return initialValues

        const newData = { ...prev }

        keys.forEach((key) => {
          newData[key] = initialValues[key]
        })

        return newData
      })
    },
    [initialValues]
  )

  const resetErrors = useCallback(() => {
    setErrors(initialErrors)
  }, [initialErrors])

  const handleDataChange = useCallback(
    <K extends object>(newData: K) => {
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
    },
    [initialValues]
  )

  const useFormResult = useMemo(() => {
    return {
      data,
      isDirty,
      isValid: isFormValid,
      errors,
      trigger,
      handleDataChange,
      handleInputChange,
      handleNonInputValueChange,
      handleBlur,
      handleErrors,
      handleSubmit,
      resetData,
      resetErrors
    }
  }, [
    data,
    errors,
    handleBlur,
    handleDataChange,
    handleErrors,
    handleInputChange,
    handleNonInputValueChange,
    handleSubmit,
    isDirty,
    isFormValid,
    resetData,
    resetErrors,
    trigger
  ])

  return useFormResult
}

export default useForm
