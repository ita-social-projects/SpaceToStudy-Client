import { useState, useCallback } from 'react'
import useMutation from '~/hooks/use-mutation'
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'
import { useModalContext } from '~/context/modal-context'
import { useStepContext } from '~/context/step-context'
import { userService } from '~/services/user-service'
import { snackbarVariants } from '~/constants'
import {
  type EditProfilePhoto,
  type UpdatedPhoto,
  type StepData,
  type UpdateUserParams
} from '~/types'
import { openAlert } from '~/redux/features/snackbarSlice'
import useSnackbarAlert from '~/hooks/use-snackbar-alert'

interface UseSteps {
  steps: string[]
}

const useSteps = ({ steps }: UseSteps) => {
  const [activeStep, setActiveStep] = useState(0)
  const { closeModal } = useModalContext()
  const { stepData } = useStepContext()
  const dispatch = useAppDispatch()
  const { userId } = useAppSelector((state) => state.appMain)
  const { handleErrorAlert } = useSnackbarAlert()

  const handleUpdateUser = useCallback(
    (params?: UpdateUserParams) => {
      return userService.updateUser(userId, params!)
    },
    [userId]
  )

  const handleResponse = () => {
    dispatch(
      openAlert({
        severity: snackbarVariants.success,
        message: 'becomeTutor.successMessage'
      })
    )
    closeModal()
  }

  const { mutate: updateUser, isPending: loading } = useMutation({
    mutationFn: handleUpdateUser,
    onSuccess: handleResponse,
    onError: handleErrorAlert
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

  const handleSubmit = () => {
    const hasErrors = stepErrors.some((stepError) => Boolean(stepError))

    const { firstName, lastName, country, city, professionalSummary } =
      stepData.generalInfo.data

    let formattedPhoto: EditProfilePhoto | undefined = undefined

    if (stepData.photo && stepData.photo.length > 0) {
      const firstPhoto = stepData.photo[0]

      if (firstPhoto instanceof File) {
        formattedPhoto = {
          src: URL.createObjectURL(firstPhoto),
          name: firstPhoto.name
        }
      } else {
        formattedPhoto = firstPhoto as UpdatedPhoto
      }
    }

    const data: UpdateUserParams = {
      photo: formattedPhoto,
      firstName,
      lastName,
      address: {
        country: country ?? '',
        city: city ?? ''
      },
      professionalSummary: professionalSummary?.length
        ? professionalSummary
        : undefined,
      mainSubjects: stepData.subjects,
      nativeLanguage: stepData.language ?? undefined
    }

    if (!hasErrors) {
      updateUser(data)
    }
  }

  const stepOperation = {
    next,
    back,
    handleSubmit,
    setActiveStep
  }

  return {
    activeStep,
    stepErrors,
    isLastStep,
    stepOperation,
    loading
  }
}

export default useSteps
