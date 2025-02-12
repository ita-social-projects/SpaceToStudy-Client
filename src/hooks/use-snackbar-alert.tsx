import { useCallback } from 'react'

import { snackbarVariants } from '~/constants'
import { ErrorResponse, SnackbarMessage } from '~/types'
import { openAlert } from '~/redux/features/snackbarSlice'
import { getErrorKey } from '~/utils/get-error-key'
import { getErrorMessage } from '~/utils/error-with-message'
import { ResponseError } from '~/exceptions'

import { useAppDispatch } from './use-redux'

const useSnackbarAlert = () => {
  const dispatch = useAppDispatch()

  const handleAlert = useCallback(
    ({
      message,
      severity
    }: {
      message: SnackbarMessage
      severity: keyof typeof snackbarVariants
    }) => {
      dispatch(
        openAlert({
          severity: snackbarVariants[severity],
          message: message
        })
      )
    },
    [dispatch]
  )

  const handleErrorAlert = useCallback(
    (error: ErrorResponse | ResponseError) => {
      const snackbarErrorMessage = {
        text: getErrorKey(error),
        options: {
          message: getErrorMessage(error.message)
        }
      }

      handleAlert({
        message: snackbarErrorMessage,
        severity: snackbarVariants.error
      })
    },
    [handleAlert]
  )

  const handleSuccessAlert = useCallback(
    (message: string) => {
      handleAlert({
        message,
        severity: snackbarVariants.success
      })
    },
    [handleAlert]
  )

  return { handleAlert, handleErrorAlert, handleSuccessAlert }
}

export default useSnackbarAlert
