import { useState } from 'react'

export const useForm = ({ initialValues, validations, onSubmit }) => {
  const [data, setData] = useState(initialValues)
  const [isDirty, setDirty] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (key) => (event) => {
    const value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value
    setData({
      ...data,
      [key]: value
    })
    setDirty(true)
  }
  
  const handleBlur = (key) => ( event ) => {
    const valid = validations[key](event.target.value)
    setErrors({
      ...errors,
      [key]: valid,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    let isValid = true
    if (validations) {
      for (const key in validations) {
        let value = data[key]
        let validation  = validations[key](value)
        if (validation) {
          isValid = false  
          setErrors({
            ...errors,
            [key]: validation ,
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
    handleSubmit,
  }
}

export default useForm
