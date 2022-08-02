import StepWrapper from '~/components/step-wrapper/StepWrapper'
import TempComponent from './TempComponent'
import FirstStep from '~/components/become-tutor-steps/firstStep/FirstStep'
import useForm from '~/hooks/use-form'
import { firstName, lastName, country, city } from '~/constants/validation/become-tutor'

const BecomeATutor = () => {
  const stepLabels = ['General info', 'Languages', 'Study category', 'Experience', 'Documents', 'Photo and Video']

  const { handleSubmit, handleChange, handleBlur, data, errors } = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      country: '',
      city: '',
      confirmAge: false
    },
    validations: { 
      firstName,
      lastName,
      country,
      city
    },
    onSubmit: async () => {
      console.log(data)
    }
  })

  const childrenArr = [
    <FirstStep
      data={ data }
      errors={ errors }
      handleBlur={ handleBlur }
      handleChange={ handleChange }
      key="1"
    />,
    <TempComponent key="2">2</TempComponent>,
    <TempComponent key="3">3</TempComponent>,
    <TempComponent key="4">4</TempComponent>,
    <TempComponent key="5">5</TempComponent>,
    <TempComponent key="6">6</TempComponent>
  ]

  return (
    <StepWrapper handleSubmit={ handleSubmit } steps={ stepLabels }>
      { childrenArr }
    </StepWrapper>
  )
}

export default BecomeATutor
