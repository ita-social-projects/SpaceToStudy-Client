import { useState } from 'react'

import StepWrapper from '~/components/step-wrapper/StepWrapper'
import TempComponent from './TempComponent'
import GeneralInfo from '~/containers/mentor-home-page/general-info/GeneralInfo'
import ExperienceStep from '~/containers/mentor-home-page/experience-step/ExperienceStep'
import AddDocuments from '~/containers/mentor-home-page/add-documents/AddDocuments'
import useForm from '~/hooks/use-form'

import { initialValues, stepLabels, validations } from '~/containers/mentor-home-page/constants'

const BecomeATutor = () => {
  const [documents, setDocuments] = useState([])
  const [documentsError, setDocumentsError] = useState()

  const addDocuments = (documents, error) => {
    setDocuments(documents)
    setDocumentsError(error)
  }

  const { handleSubmit, handleChange, handleBlur, data, errors } = useForm({
    initialValues,
    validations,
    onSubmit: async () => {
      console.log(data)
      console.log(documents)
    }
  })

  const [stepErrors, setStepErrors] = useState({})

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
    <ExperienceStep
      data={ data }
      errors={ errors }
      handleBlur={ handleBlur }
      handleChange={ handleChange }
      key='4'
      setStepErrors={ setStepErrors }
    />,
    <AddDocuments
      addDocuments={ addDocuments }
      documents={ documents }
      documentsError={ documentsError }
      key='5'
      setStepErrors={ setStepErrors }
    />,
    <TempComponent key='6'>6</TempComponent>
  ]

  return (
    <StepWrapper handleSubmit={ handleSubmit } stepErrors={ stepErrors } steps={ stepLabels }>
      { childrenArr }
    </StepWrapper>
  )
}

export default BecomeATutor
