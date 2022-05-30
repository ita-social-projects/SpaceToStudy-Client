import { useState } from 'react'

export const useForm = ({ initialValues, validationSchema, onSubmit }) => {
  const [data, setData] = useState(initialValues)
  const [dirty, setDirty] = useState(false)
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
    const valid = validationSchema[key](event.target.value)
    setErrors({
      ...errors,
      [key]: valid,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    let isValid = true
    if (validationSchema) {
      for (const key in validationSchema) {
        let value = data[key]
        let validation  = validationSchema[key](value)
        if (validation.error) {
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
    dirty,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  }
}

export default useForm
