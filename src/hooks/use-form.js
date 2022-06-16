import { useState } from 'react'

export const useForm = ({ initialValues, validations, onSubmit }) => {
  const [data, setData] = useState(initialValues)
  const [isDirty, setDirty] = useState(false)
  const [errors, setErrors] = useState({})
  const [isTouched, setTouched] = useState({})

  const handleChange = (key) => (event) => {
    let valid
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    setData({
      ...data,
      [key]: value
    })
    if (isTouched[key]) {
      if (key === 'confirmPassword') {
        valid = validations[key](data.password, event.target.value)
      } else {
        valid = validations[key](event.target.value)
      }
      setErrors({
        ...errors,
        [key]: valid
      })
    }
  }

  const handleBlur = (key) => (event) => {
    let valid
    setDirty(data[key] !== initialValues[key])
    if (key === 'confirmPassword') {
      valid = validations[key](data.password, event.target.value)
    } else {
      valid = validations[key](event.target.value)
    }
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
        let validation = validations[key](value)
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

  return {
    data,
    isDirty,
    errors,
    handleChange,
    handleBlur,
    handleSubmit
  }
}

export default useForm
