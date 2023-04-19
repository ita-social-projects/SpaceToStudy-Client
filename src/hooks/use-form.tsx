import { useState } from 'react'
import { getEmptyValues } from '~/utils/helper-functions'
import { isEqual } from '~/utils/isEqual'

interface UseFormProps<T> {
  initialValues: T
  initialErrors?: { [K in keyof T]: string }
  validations?: Partial<{
    [K in keyof T]: (value: T[K] | string, data: T) => string | undefined
  }>
  onSubmit: () => Promise<void>
}

interface UseFormOutput<T> {
  data: T
  isDirty: boolean
  errors: { [K in keyof T]: string }
  handleInputChange: (
    key: keyof T
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void
  handleNonInputValueChange: (key: keyof T, value: T[keyof T]) => void
  handleBlur: (
    key: keyof T
  ) => (event: React.FocusEvent<HTMLInputElement>) => void
  handleErrors: (key: keyof T, error: string) => void
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
}

export const useForm = <T extends object>({
  initialValues,
  initialErrors = getEmptyValues(initialValues, ''),
  validations,
  onSubmit
}: UseFormProps<T>): UseFormOutput<T> => {
  const [data, setData] = useState<T>(initialValues)
  const [isDirty, setDirty] = useState(false)
  const [errors, setErrors] =
    useState<{ [K in keyof T]: string }>(initialErrors)
  const [isTouched, setTouched] = useState<{ [K in keyof T]: boolean }>(
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
      setData((prev) => ({
        ...prev,
        [key]: value
      }))
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
      setDirty(!isEqual(newData, initialValues))
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
      setDirty(!isEqual(data, initialValues))

      const valid = validateValue(key, event.target.value)

      setErrors((prev) => ({
        ...prev,
        [key]: valid ?? ''
      }))
      setTouched((prev) => ({
        ...prev,
        [key]: true
      }))
    }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    let isValid = true
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

    isValid ? await onSubmit() : setErrors(newErrors)
  }

  return {
    data,
    isDirty,
    errors,
    handleInputChange,
    handleNonInputValueChange,
    handleBlur,
    handleErrors,
    handleSubmit
  }
}

export default useForm
