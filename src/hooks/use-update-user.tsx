import { useCallback } from 'react'
import { snackbarVariants } from '~/constants'
import { useSnackBarContext } from '~/context/snackbar-context'
import { userService } from '~/services/user-service'
import { ErrorResponse, UpdateUserParams } from '~/types'
import useAxios from './use-axios'

const useUpdateUser = (userId: string) => {
  const { setAlert } = useSnackBarContext()

  const updateUser = useCallback(
    (data: UpdateUserParams) => userService.updateUser(userId, data),
    [userId]
  )

  const handleResponse = () => {
    setAlert({
      severity: snackbarVariants.success,
      message: 'editProfilePage.profile.successMessage'
    })
  }

  const handleResponseError = (error: ErrorResponse) => {
    setAlert({
      severity: snackbarVariants.error,
      message: error ? `errors.${error.code}` : ''
    })
  }

  const { loading, fetchData } = useAxios({
    service: updateUser,
    fetchOnMount: false,
    defaultResponse: null,
    onResponse: handleResponse,
    onResponseError: handleResponseError
  })

  const handleSubmit = (data: UpdateUserParams) => {
    const {
      photo,
      firstName,
      lastName,
      address,
      professionalSummary,
      nativeLanguage,
      videoLink,
      mainSubjects
    } = data

    const updatedData: UpdateUserParams = {
      firstName,
      lastName,
      address,
      professionalSummary,
      mainSubjects,
      nativeLanguage,
      videoLink
    }

    if (photo !== undefined) updatedData.photo = photo

    if (updatedData.photo || updatedData.photo === null) {
      handleResponse()
      window.location.reload()
    }

    fetchData(updatedData).catch(console.error)
  }

  return { loading, handleSubmit }
}

export default useUpdateUser
