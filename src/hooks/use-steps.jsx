import { useCallback, useContext, useState } from 'react'

import useAxios from '~/hooks/use-axios'
import { useAppSelector } from '~/hooks/use-redux'

import { ModalContext } from '~/context/modal-context'
import { useStepContext } from '~/context/step-context'
import { useSnackBarContext } from '~/context/snackbar-context'
import { userService } from '~/services/user-service'
import { snackbarVariants } from '~/constants'

const useSteps = ({ steps }) => {
  const [activeStep, setActiveStep] = useState(0)
  const { closeModal } = useContext(ModalContext)
  const { stepData } = useStepContext()
  const { setAlert } = useSnackBarContext()
  const { userId } = useAppSelector((state) => state.appMain)

  const updateUser = useCallback(
    (data) => userService.updateUser(userId, data),
    [userId]
  )

  const handleResponse = () => {
    setAlert({
      severity: snackbarVariants.success,
      message: 'becomeTutor.successMessage'
    })
    closeModal()
  }

  const { loading, fetchData } = useAxios({
    service: updateUser,
    fetchOnMount: false,
    defaultResponse: null,
    onResponse: handleResponse
  })

  const stepErrors = Object.values(stepData).map(
    (data) =>
      data && data.errors && Object.values(data.errors).find((error) => error)
  )

  const next = () => {
    setActiveStep((prev) => prev + 1)
  }

  const back = () => {
    setActiveStep((prev) => prev - 1)
  }

  const isLastStep = activeStep === steps.length - 1

  const handleSubmit = () => {
    const hasErrors = stepErrors.find((error) => error)

    const { firstName, lastName, country, city, professionalSummary } =
      stepData.generalInfo.data

    const data = {
      photo: stepData.photo[0] ? stepData.photo[0].src : '',
      firstName,
      lastName,
      address: {
        country: country ?? '',
        city: city ?? ''
      },
      professionalSummary: professionalSummary,
      mainSubjects: stepData.subjects,
      nativeLanguage: stepData.language ?? ''
    }

    !hasErrors && fetchData(data)
  }

  const stepOperation = {
    next,
    back,
    handleSubmit,
    setActiveStep
  }

  return { activeStep, stepErrors, isLastStep, stepOperation, loading }
}

export default useSteps
