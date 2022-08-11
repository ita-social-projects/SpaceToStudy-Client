import StepWrapper from '~/components/step-wrapper/StepWrapper'
import TempComponent from './TempComponent'
import useForm from '~/hooks/use-form'
import useUpload from '~/hooks/use-upload'
import { initialValues, stepLabels, validations } from '~/containers/mentor-home-page/constants'
import GeneralInfo from '~/containers/mentor-home-page/general-info/GeneralInfo'
import AddDocuments from '~/containers/mentor-home-page/add-documents/AddDocuments'

import { certificates } from '~/constants/validation/files'

const BecomeATutor = () => {
  const uploadCertificates = useUpload({ validations: certificates, maxQuantityFiles: 8 })

  const { handleSubmit, handleChange, handleBlur, data, errors } = useForm({
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
      key="1"
    />,
    <TempComponent key="2">2</TempComponent>,
    <TempComponent key="3">3</TempComponent>,
    <TempComponent key="4">4</TempComponent>,
    <AddDocuments  key='5' uploadCertificates={ uploadCertificates } />,
    <TempComponent key="6">6</TempComponent>
  ]

  return (
    <StepWrapper handleSubmit={ handleSubmit } steps={ stepLabels }>
      { childrenArr }
    </StepWrapper>
  )
}

export default BecomeATutor
