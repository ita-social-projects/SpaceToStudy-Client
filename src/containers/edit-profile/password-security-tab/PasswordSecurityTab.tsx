import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'

import { useModalContext } from '~/context/modal-context'

import useChangeUserStatus from '~/hooks/use-change-user-status'
import PasswordSecurityItem from '~/containers/edit-profile/password-security-tab/password-security-item/PasswordSecurityItem'
import ChangePasswordModal from '~/containers/edit-profile/password-security-tab/change-password-modal/ChangePasswordModal'

import { ButtonVariantEnum } from '~/types'

const PasswordSecurityTab: FC = () => {
  const { t } = useTranslation()
  const { openModal } = useModalContext()
  const { neededAction, checkStatusChange } = useChangeUserStatus()

  const openChangePasswordModal = () => {
    openModal({
      component: <ChangePasswordModal />
    })
  }
  const handleChangeStatusClick = () => {
    void checkStatusChange(
      `editProfilePage.profile.passwordSecurityTab.${neededAction}Title`,
      `editProfilePage.profile.passwordSecurityTab.${neededAction}Description`,
      true
    )
  }
  return (
    <Box>
      <PasswordSecurityItem
        buttonText={t(
          'editProfilePage.profile.passwordSecurityTab.changePassword'
        )}
        buttonVariant={ButtonVariantEnum.Tonal}
        description={t('editProfilePage.profile.passwordSecurityTab.subTitle')}
        onClick={openChangePasswordModal}
        title={t('editProfilePage.profile.passwordSecurityTab.title')}
      />
      <PasswordSecurityItem
        buttonText={t(
          `editProfilePage.profile.passwordSecurityTab.${neededAction}Account`
        )}
        buttonVariant={ButtonVariantEnum.Danger}
        description={t(
          'editProfilePage.profile.passwordSecurityTab.deactivateSubTitle'
        )}
        onClick={handleChangeStatusClick}
        title={t('editProfilePage.profile.passwordSecurityTab.deactivateTitle')}
      />
    </Box>
  )
}

export default PasswordSecurityTab
