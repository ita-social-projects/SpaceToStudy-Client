import { useState } from 'react'
import { isEqual } from '~/utils/isEqual'

export const useForm = ({ initialValues, validations, onSubmit }) => {
  const [data, setData] = useState(initialValues)
  const [isDirty, setDirty] = useState(false)
  const [errors, setErrors] = useState({})
  const [isTouched, setTouched] = useState({})

  const handleChange = (key) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    setData({
      ...data,
      [key]: value
    })
    if (isTouched[key]) {
      const valid = validations[key](event.target.value, data)
      setErrors({
        ...errors,
        [key]: valid
      })
    }
  }

  const handleAddFiles = (key, files) => {
    setData({
      ...data,
      [key]: files
    })
  }

  const handleErrors = (key, error) => {
    setErrors({
      ...errors,
      [key]: error
    })
  }

  const handleBlur = (key) => (event) => {
    setDirty(!isEqual(data, initialValues))
    const valid = validations[key](event.target.value, data)
    setErrors({
      ...errors,
      [key]: valid
    })
    setTouched({
      ...isTouched,
      [key]: true
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    let isValid = true
    if (validations) {
      for (const key in validations) {
        let value = data[key]
        let validation = validations[key](value, data)
        if (validation) {
          isValid = false
          setErrors({
            ...errors,
            [key]: validation
          })
          return
        }
      }
    }
    if (isValid) {
      onSubmit()
    }
  }

  const setFieldValue = (key, value) => {
    setData({
      ...data,
      [key]: value
    })
  }

  return {
    data,
    isDirty,
    errors,
    handleChange,
    handleAddFiles,
    handleBlur,
    handleErrors,
    handleSubmit,
    setFieldValue
  }
}

export default useForm
