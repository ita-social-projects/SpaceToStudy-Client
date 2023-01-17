import { useCallback, useState } from 'react'
import StepWrapper from '~/components/step-wrapper/StepWrapper'
import TempComponent from './TempComponent'

import GeneralInfo from '~/containers/tutor-home-page/general-info/GeneralInfo'
import AddPhoto from '../add-photo/AddPhoto'

import useForm from '~/hooks/use-form'

import { initialValues, stepLabels, validations } from '~/containers/tutor-home-page/constants'

const BecomeATutor = () => {
  const [stepErrors, setStepErrors] = useState({})

  const handleStepErrors = useCallback((stepLabel, isError) => {
    setStepErrors((prevState) => ({ ...prevState, [stepLabel]: Boolean(isError) }))
  }, [])

  const { handleSubmit, handleChange, handleBlur, handleErrors, handleAddFiles, data, errors } = useForm({
    initialValues,
    validations,
    onSubmit: async () => {
      console.log(data)
    }
  })

  const childrenArr = [
    <GeneralInfo
      data={ data }
      errors={ errors }
      handleBlur={ handleBlur }
      handleChange={ handleChange }
      key='1'
      setStepErrors={ setStepErrors }
    />,
    <TempComponent key='2'>2</TempComponent>,
    <TempComponent key='3'>3</TempComponent>,
    <AddPhoto
      data={ data }
      errors={ errors }
      handleAddFiles={ handleAddFiles }
      handleErrors={ handleErrors }
      handleStepErrors={ handleStepErrors }
      key='4'
    />
  ]

  return (
    <StepWrapper handleSubmit={ handleSubmit } stepErrors={ stepErrors } steps={ stepLabels }>
      { childrenArr }
    </StepWrapper>
  )
}

export default BecomeATutor
