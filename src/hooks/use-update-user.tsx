import { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { snackbarVariants } from '~/constants'
import { userService } from '~/services/user-service'
import { ErrorResponse, UpdateUserParams } from '~/types'
import useAxios from './use-axios'
import { useAppDispatch } from './use-redux'
import { openAlert } from '~/redux/features/snackbarSlice'
import { getErrorKey } from '~/utils/get-error-key'

const useUpdateUser = (userId: string, shouldRefreshAfterResponse = false) => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

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

    if (shouldRefreshAfterResponse) {
      navigate(0)
    }
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

  const handleSubmit = (data: UpdateUserParams) => {
    fetchData(data).catch(console.error)
  }

  return { loading, handleSubmit }
}

export default useUpdateUser
