import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import AppButton from '~/components/app-button/AppButton'
import AppTextField from '~/components/app-text-field/AppTextField'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import useForm from '~/hooks/use-form'
import useChangeUserStatus from '~/hooks/use-change-user-status'

import { confirmPassword, password } from '~/utils/validations/login'
import { ButtonVariantEnum, InputEnum, SizeEnum } from '~/types'
import { FormValues } from '~/types/edit-user-profile/interfaces/securityBlockForm.interfaces'
import { styles } from '~/containers/edit-profile/password-security-tab/PasswordSecurityTab.styles'

const PasswordSecurityTab = () => {
  const { t } = useTranslation()
  const { neededAction, checkStatusChange } = useChangeUserStatus()
  const { data, handleInputChange, errors, handleBlur, resetData } =
    useForm<FormValues>({
      initialValues: {
        currentPassword: '',
        password: '',
        confirmPassword: ''
      },
      validations: { password, confirmPassword }
    })

  const handleChangeStatusClick = () => {
    void checkStatusChange(
      `editProfilePage.profile.passwordSecurityTab.${neededAction}Title`,
      `editProfilePage.profile.passwordSecurityTab.${neededAction}Description`,
      true
    )
  }

  return (
    <Box sx={styles.container}>
      <TitleWithDescription
        description={t(
          'editProfilePage.profile.passwordSecurityTab.description'
        )}
        style={styles.titleAndDescription}
        title={t('editProfilePage.profile.passwordSecurityTab.title')}
      />
      <Box>
        <Typography sx={styles.subtitle}>
          {t('editProfilePage.profile.passwordSecurityTab.changePassword')}
        </Typography>
        <AppTextField
          fullWidth
          label={t(
            'editProfilePage.profile.passwordSecurityTab.currentPassword'
          )}
          onChange={handleInputChange('currentPassword')}
          type={InputEnum.Password}
          value={data.currentPassword}
        />
        <AppTextField
          errorMsg={t(errors.password)}
          fullWidth
          label={t('editProfilePage.profile.passwordSecurityTab.newPassword')}
          onBlur={handleBlur('password')}
          onChange={handleInputChange('password')}
          type={InputEnum.Password}
          value={data.password}
        />
        <AppTextField
          errorMsg={t(errors.confirmPassword)}
          fullWidth
          label={t(
            'editProfilePage.profile.passwordSecurityTab.retypePassword'
          )}
          onBlur={handleBlur('confirmPassword')}
          onChange={handleInputChange('confirmPassword')}
          type={InputEnum.Password}
          value={data.confirmPassword}
        />
        <Box sx={styles.passwordButtonsContainer}>
          <AppButton
            size={SizeEnum.Large}
            variant={ButtonVariantEnum.Contained}
          >
            {t('editProfilePage.profile.passwordSecurityTab.savePassword')}
          </AppButton>
          <AppButton
            onClick={() => resetData()}
            size={SizeEnum.Large}
            sx={styles.discardButton}
            variant={ButtonVariantEnum.Tonal}
          >
            {t('common.discard')}
          </AppButton>
        </Box>
        <Divider />
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
    </Box>
  )
}

export default PasswordSecurityTab
