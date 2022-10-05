import { useCallback, useState } from 'react'
import StepWrapper from '~/components/step-wrapper/StepWrapper'
import TempComponent from './TempComponent'

import GeneralInfo from '~/containers/tutor-home-page/general-info/GeneralInfo'
import ExperienceStep from '~/containers/tutor-home-page/experience-step/ExperienceStep'
import AddDocuments from '~/containers/tutor-home-page/add-documents/AddDocuments'
import AddPhoto from '../add-photo/AddPhoto'

import useForm from '~/hooks/use-form'

import { initialValues, stepLabels, validations } from '~/containers/tutor-home-page/constants'

const BecomeATutor = () => {
  const [documents, setDocuments] = useState([])
  const [documentsError, setDocumentsError] = useState()
  const [stepErrors, setStepErrors] = useState({})

  const handleStepErrors = useCallback((stepLabel, isError) => {
    setStepErrors((prevState) => ({ ...prevState, [stepLabel]: Boolean(isError) }))
  }, [])

  const addDocuments = ({ files, error }) => {
    files && setDocuments(files)
    setDocumentsError(error)
  }

  const { handleSubmit, handleChange, handleBlur, handleErrors, handleAddFiles, data, errors } = useForm({
    initialValues,
    validations,
    onSubmit: async () => {
      console.log(data)
      console.log(documents)
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
    <ExperienceStep
      data={ data }
      errors={ errors }
      handleBlur={ handleBlur }
      handleChange={ handleChange }
      handleErrors={ handleErrors }
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
    <AddPhoto
      data={ data }
      errors={ errors }
      handleAddFiles={ handleAddFiles }
      handleErrors={ handleErrors }
      handleStepErrors={ handleStepErrors }
      key='6'
    />
  ]

  return (
    <StepWrapper handleSubmit={ handleSubmit } stepErrors={ stepErrors } steps={ stepLabels }>
      { childrenArr }
    </StepWrapper>
  )
}

export default BecomeATutor
