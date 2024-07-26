import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'

import { useModalContext } from '~/context/modal-context'
import useChangeUserStatus from '~/hooks/use-change-user-status'
import PasswordSecurityItem from './password-security-item/PasswordSecurityItem'
import ChangePasswordModal from './change-password-modal/ChangePasswordModal'
import AppButton from '~/components/app-button/AppButton'

import { styles } from '~/containers/edit-profile/password-security-tab/PasswordSecurityTab.styles'
import { ButtonVariantEnum, SizeEnum } from '~/types'

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
        description={t('editProfilePage.profile.passwordSecurityTab.subTitle')}
        onClick={openChangePasswordModal}
        sx={styles.deactivateButton}
        title={t('editProfilePage.profile.passwordSecurityTab.title')}
      />
      <AppButton
        onClick={handleChangeStatusClick}
        size={SizeEnum.Large}
        sx={styles.deactivateButton}
        variant={ButtonVariantEnum.Danger}
      >
        {t(
          `editProfilePage.profile.passwordSecurityTab.${neededAction}Account`
        )}
      </AppButton>
    </Box>
  )
}

export default PasswordSecurityTab
