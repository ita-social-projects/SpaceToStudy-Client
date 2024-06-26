import { useCallback } from 'react'
import { snackbarVariants } from '~/constants'
import { userService } from '~/services/user-service'
import { ErrorResponse, UpdateUserParams } from '~/types'
import useAxios from './use-axios'
import { useAppDispatch } from './use-redux'
import { openAlert } from '~/redux/features/snackbarSlice'
import { getErrorKey } from '~/utils/get-error-key'

const useUpdateUser = (userId: string) => {
  const dispatch = useAppDispatch()

  const updateUser = useCallback(
    (data: UpdateUserParams) => userService.updateUser(userId, data),
    [userId]
  )

  const handleResponse = () => {
    dispatch(
      openAlert({
        severity: snackbarVariants.success,
        message: 'editProfilePage.profile.successMessage'
      })
    )
  }

  const handleResponseError = (error?: ErrorResponse) => {
    dispatch(
      openAlert({
        severity: snackbarVariants.error,
        message: getErrorKey(error)
      })
    )
  }

  const { loading, fetchData } = useAxios({
    service: updateUser,
    fetchOnMount: false,
    defaultResponse: null,
    onResponse: handleResponse,
    onResponseError: handleResponseError
  })

  const handleSubmit = async (data: UpdateUserParams) => {
    await fetchData(data)
  }

  return { loading, handleSubmit }
}

export default useUpdateUser
