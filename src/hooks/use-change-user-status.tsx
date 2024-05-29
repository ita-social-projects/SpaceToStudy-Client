import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from './use-redux'
import { ErrorResponse, UserStatusEnum } from '~/types'
import { userService } from '~/services/user-service'
import { setUserStatus } from '~/redux/reducer'
import {
  getFromLocalStorage,
  setToLocalStorage
} from '~/services/local-storage-service'
import { dismissedActivation, snackbarVariants } from '~/constants'
import useAxios from './use-axios'
import useConfirm from './use-confirm'
import { useTranslation } from 'react-i18next'
import { openAlert } from '~/redux/features/snackbarSlice'

const useChangeUserStatus = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { checkConfirmation } = useConfirm()
  const { userId, userStatus } = useAppSelector((state) => state.appMain)

  const isActive = userStatus === UserStatusEnum.Active
  const neededAction = isActive ? 'deactivate' : 'activate'

  const changeStatusService = useCallback(
    () =>
      isActive
        ? userService.deactivateUser(userId)
        : userService.activateUser(userId),
    [userId, isActive]
  )

  const onResponse = useCallback(() => {
    dispatch(
      openAlert({
        severity: snackbarVariants.success,
        message: t('editProfilePage.profile.successMessage')
      })
    )

    const status = isActive ? UserStatusEnum.Deactivated : UserStatusEnum.Active
    dispatch(setUserStatus(status))

    if (!isActive) setToLocalStorage('activation', dismissedActivation)
  }, [dispatch, isActive, t])

  const onResponseError = useCallback(
    (error: ErrorResponse) => {
      dispatch(
        openAlert({
          severity: snackbarVariants.error,
          message: `errors.${error.message}`
        })
      )
    },
    [dispatch]
  )

  const { fetchData: changeStatus } = useAxios({
    service: changeStatusService,
    defaultResponse: null,
    fetchOnMount: false,
    onResponse,
    onResponseError
  })

  const checkStatusChange = useCallback(
    async (title: string, message: string, checkOnClick?: boolean) => {
      const open =
        userStatus === UserStatusEnum.Deactivated &&
        getFromLocalStorage('activation') !== dismissedActivation

      if (open || checkOnClick) {
        const confirmed = await checkConfirmation({
          message,
          title,
          confirmButton: t(
            `editProfilePage.profile.passwordSecurityTab.${neededAction}Btn`
          ),
          cancelButton: t('common.cancel'),
          check: true
        })

        if (confirmed) changeStatus().catch(console.error)
        setToLocalStorage('activation', dismissedActivation)
      }
    },
    [t, checkConfirmation, changeStatus, userStatus, neededAction]
  )

  return {
    neededAction,
    checkStatusChange
  }
}

export default useChangeUserStatus
