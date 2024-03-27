import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AppButton from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { t } from 'i18next'

import AppTextField from '~/components/app-text-field/AppTextField'
import ConfirmDialog from '~/components/confirm-dialog/ConfirmDialog'
import useForm from '~/hooks/use-form'

import { styles } from './SecurityBlock.styles'
import { confirmPassword, password } from '~/utils/validations/login'
import { ButtonVariantEnum, SizeEnum } from '~/types'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

const SecurityBlock = () => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  interface FormValues {
    currentPassword: string
    password: string
    confirmPassword: string
  }

  const { data, handleInputChange, errors, handleBlur, resetData } =
    useForm<FormValues>({
      initialValues: {
        currentPassword: '',
        password: '',
        confirmPassword: ''
      },
      validations: { password, confirmPassword }
    })

  return (
    <Box sx={styles.container}>
      <TitleWithDescription
        description={t('editTutor.passwordSecurityTab.description')}
        style={styles.titleAndDescription}
        title={t('editTutor.passwordSecurityTab.title')}
      />
      <Box>
        <Typography sx={styles.subtitle}>
          {t('editTutor.passwordSecurityTab.changePassword')}
        </Typography>
        <AppTextField
          fullWidth
          label={t('editTutor.passwordSecurityTab.currentPassword')}
          onChange={handleInputChange('currentPassword')}
          type={'password'}
          value={data.currentPassword}
        />
        <AppTextField
          errorMsg={t(errors.password)}
          fullWidth
          label={t('editTutor.passwordSecurityTab.newPassword')}
          onBlur={handleBlur('password')}
          onChange={handleInputChange('password')}
          type={'password'}
          value={data.password}
        />
        <AppTextField
          errorMsg={t(errors.confirmPassword)}
          fullWidth
          label={t('editTutor.passwordSecurityTab.retypePassword')}
          onBlur={handleBlur('confirmPassword')}
          onChange={handleInputChange('confirmPassword')}
          type={'password'}
          value={data.confirmPassword}
        />
        <Box sx={styles.passwordButtonsContainer}>
          <AppButton
            onClick={() => {}}
            size={SizeEnum.Medium}
            variant={ButtonVariantEnum.Contained}
          >
            {t('editTutor.passwordSecurityTab.savePassword')}
          </AppButton>
          <AppButton
            onClick={() => resetData()}
            size={SizeEnum.Medium}
            sx={styles.discardButton}
            variant={ButtonVariantEnum.Tonal}
          >
            {t('common.discard')}
          </AppButton>
        </Box>
        <Divider />
        <AppButton
          onClick={() => setIsConfirmOpen(!isConfirmOpen)}
          size={SizeEnum.Large}
          sx={styles.deactivateButton}
          variant={ButtonVariantEnum.Contained}
        >
          {t('editTutor.passwordSecurityTab.deactivateAccount')}
        </AppButton>
        <ConfirmDialog
          cancelButton={t('common.cancel')}
          confirmButton={t('editTutor.passwordSecurityTab.deactivateBtn')}
          message={t('editTutor.passwordSecurityTab.deactivateDescription')}
          onConfirm={() => {}}
          onDismiss={() => setIsConfirmOpen(!isConfirmOpen)}
          open={isConfirmOpen}
          revertButtons
          title={t('editTutor.passwordSecurityTab.deactivateTitle')}
        />
      </Box>
    </Box>
  )
}

export default SecurityBlock
