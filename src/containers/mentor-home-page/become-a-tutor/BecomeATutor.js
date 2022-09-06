import { useState } from 'react'

import StepWrapper from '~/components/step-wrapper/StepWrapper'
import TempComponent from './TempComponent'
import GeneralInfo from '~/containers/mentor-home-page/general-info/GeneralInfo'
import ExperienceStep from '~/containers/mentor-home-page/experience-step/ExperienceStep'
import AddDocuments from '~/containers/mentor-home-page/add-documents/AddDocuments'
import AddPhoto from '../add-photo/AddPhoto'

import useForm from '~/hooks/use-form'
import { imageResize } from '~/utils/image-resize'

import { initialValues, stepLabels, validations } from '~/containers/mentor-home-page/constants'

const BecomeATutor = () => {
  const [documents, setDocuments] = useState([])
  const [documentsError, setDocumentsError] = useState()
  const [photo, setPhoto] = useState([])
  const [photoForUpload, setPhotoForUpload] = useState('')
  const [photoError, setPhotoError] = useState()

  const addDocuments = (documents, error) => {
    setDocuments(documents)
    setDocumentsError(error)
  }

  const addPhoto = (photo, error) => {
    setPhoto(photo)
    setPhotoError(error)
    if (photo.length) {
      const originalPhotoPath = URL.createObjectURL(photo[0])
      const photoSizes = { newWidth: 648, newHeight: 648 }
      imageResize(originalPhotoPath, photoSizes).then((resizedPhoto) => {
        setPhotoForUpload(resizedPhoto)
      })
    } else {
      setPhotoForUpload('')
    }
  }

  const { handleSubmit, handleChange, handleBlur, data, errors } = useForm({
    initialValues,
    validations,
    onSubmit: async () => {
      console.log(data)
      console.log(documents)
      console.log(photoForUpload)
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
    <AddPhoto
      addPhoto={ addPhoto }
      key='6'
      photo={ photo }
      photoError={ photoError }
      photoForUpload={ photoForUpload }
      setStepErrors={ setStepErrors }
    />
  ]

  return (
    <StepWrapper handleSubmit={ handleSubmit } stepErrors={ stepErrors } steps={ stepLabels }>
      { childrenArr }
    </StepWrapper>
  )
}

export default BecomeATutor
