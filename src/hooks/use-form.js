import { useState } from 'react'

export const useForm = (options) => {
  const [data, setData] = useState((options?.initialValues || {}))
  const [errors, setErrors] = useState({})

  const handleChange = (key) => (event) => {
    const value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value
    setData({
      ...data,
      [key]: value
    })
  }
  
  const handleBlur = (key) => ( event ) => {
    const validations = options?.validationSchema
    const isValid = RegExp(validations[key].regExp).test( event.target.value )
    setErrors({
      ...errors,
      [key]: !isValid,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    const validations = options?.validationSchema
    
    if (validations) {
      const newErrors = {}
      for (const key in validations) {
        let isValid = RegExp(validations[key].regExp).test( data[key] )
        newErrors[key] = !isValid
        console.log('hello',key, isValid)
        if (!isValid) {
          setErrors(newErrors)
          console.log(errors)
          return
        }
      }
    }

    if (options?.onSubmit) {
      options.onSubmit()
    }
    // setErrors({})
  }

  return {
    data,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  }
}

export default useForm
