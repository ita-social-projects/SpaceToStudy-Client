import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'
import useMutation from '~/hooks/use-mutation'
import useConfirm from '~/hooks/use-confirm'
import useSnackbarAlert from '~/hooks/use-snackbar-alert'

import { UserStatusEnum } from '~/types'
import { userService } from '~/services/user-service'
import { setUserStatus } from '~/redux/reducer'
import {
  getFromLocalStorage,
  setToLocalStorage
} from '~/services/local-storage-service'
import { dismissedActivation, snackbarVariants } from '~/constants'

const useChangeUserStatus = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { checkConfirmation } = useConfirm()
  const { userId, userStatus } = useAppSelector((state) => state.appMain)
  const { handleAlert, handleErrorAlert } = useSnackbarAlert()

  const isActive = userStatus === UserStatusEnum.Active
  const neededAction = isActive ? 'deactivate' : 'activate'

  const changeStatusService = useCallback(
    () =>
      isActive
        ? userService.deactivateUser(userId)
        : userService.activateUser(userId),
    [userId, isActive]
  )

  const handleSuccessfulResponse = useCallback(() => {
    handleAlert({
      message: t('editProfilePage.profile.successMessage'),
      severity: snackbarVariants.success
    })

    const status = isActive ? UserStatusEnum.Deactivated : UserStatusEnum.Active
    dispatch(setUserStatus(status))

    if (!isActive) {
      setToLocalStorage('activation', dismissedActivation)
    }
  }, [isActive, t, dispatch, handleAlert])

  const { mutate: changeStatus } = useMutation({
    mutationFn: changeStatusService,
    onSuccess: handleSuccessfulResponse,
    onError: handleErrorAlert
  })

  const checkStatusChange = useCallback(
    async (title: string, message: string, checkOnClick?: boolean) => {
      const open =
        !isActive && getFromLocalStorage('activation') !== dismissedActivation

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

        setToLocalStorage('activation', dismissedActivation)
        if (confirmed) {
          changeStatus()
        }
      }
    },
    [t, checkConfirmation, changeStatus, isActive, neededAction]
  )

  return {
    neededAction,
    checkStatusChange
  }
}

export default useChangeUserStatus
