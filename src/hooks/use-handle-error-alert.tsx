import { useCallback } from 'react'

import { useAppDispatch } from './use-redux'
import { snackbarVariants } from '~/constants'
import { openAlert } from '~/redux/features/snackbarSlice'
import { ResponseError } from '~/exceptions'

const useHandleErrorAlert = () => {
  const dispatch = useAppDispatch()

  const handleErrorAlert = useCallback(
    (error: ResponseError) => {
      dispatch(
        openAlert({
          severity: snackbarVariants.error,
          message: error.message
        })
      )
    },
    [dispatch]
  )

  return handleErrorAlert
}

export default useHandleErrorAlert
