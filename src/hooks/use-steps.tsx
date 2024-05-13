import { useCallback, useState } from 'react'

import useAxios from '~/hooks/use-axios'
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'

import { useModalContext } from '~/context/modal-context'
import { useStepContext } from '~/context/step-context'
import { userService } from '~/services/user-service'
import { snackbarVariants } from '~/constants'
import { ErrorResponse, StepData, UpdateUserParams } from '~/types'
import { openAlert } from '~/redux/features/snackbarSlice'
import { getErrorKey } from '~/utils/get-error-key'

interface UseSteps {
  steps: string[]
}

const useSteps = ({ steps }: UseSteps) => {
  const [activeStep, setActiveStep] = useState(0)
  const { closeModal } = useModalContext()
  const { stepData } = useStepContext()
  const dispatch = useAppDispatch()
  const { userId } = useAppSelector((state) => state.appMain)

  const updateUser = useCallback(
    (params?: UpdateUserParams) => userService.updateUser(userId, params!),
    [userId]
  )

  const handleResponseError = (error?: ErrorResponse) => {
    dispatch(
      openAlert({
        severity: snackbarVariants.error,
        message: getErrorKey(error)
      })
    )
  }

  const handleResponse = () => {
    dispatch(
      openAlert({
        severity: snackbarVariants.success,
        message: 'becomeTutor.successMessage'
      })
    )
    closeModal()
  }

  const { loading, fetchData } = useAxios({
    service: updateUser,
    fetchOnMount: false,
    defaultResponse: null,
    onResponse: handleResponse,
    onResponseError: handleResponseError
  })

  const stepDataValues = Object.values(stepData) as Array<
    StepData[keyof StepData]
  >

  const stepErrors = stepDataValues.map((data) => {
    if (data && typeof data === 'object' && 'errors' in data) {
      const errors = data.errors
      const firstError = Object.values(errors).find((error) => Boolean(error))
      return firstError ?? ''
    }

    return ''
  })

  const next = () => {
    setActiveStep((prev) => prev + 1)
  }

  const back = () => {
    setActiveStep((prev) => prev - 1)
  }

  const isLastStep = activeStep === steps.length - 1

  const handleSubmit = async () => {
    const hasErrors = stepErrors.some((stepError) => Boolean(stepError))

    const { firstName, lastName, country, city, professionalSummary } =
      stepData.generalInfo.data

    const data: UpdateUserParams = {
      photo: stepData.photo[0] ? stepData.photo[0] : '',
      firstName,
      lastName,
      address: {
        country: country ?? '',
        city: city ?? ''
      },
      professionalSummary: professionalSummary,
      mainSubjects: stepData.subjects,
      nativeLanguage: stepData.language ?? null
    }

    if (!hasErrors) {
      await fetchData(data)
    }
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
