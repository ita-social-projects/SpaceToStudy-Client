import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { useModalContext } from '~/context/modal-context'

import { AuthService } from '~/services/auth-service'

import useForm from '~/hooks/use-form'
import useAxios from '~/hooks/use-axios'
import useInputVisibility from '~/hooks/use-input-visibility'
import useConfirm from '~/hooks/use-confirm'
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'

import Loader from '~/components/loader/Loader'
import AppButton from '~/components/app-button/AppButton'
import AppTextField from '~/components/app-text-field/AppTextField'

import { snackbarVariants } from '~/constants'

import { openAlert } from '~/redux/features/snackbarSlice'

import { styles } from '~/containers/edit-profile/password-security-tab/PasswordSecurityTab.styles'

import {
  ButtonVariantEnum,
  ComponentEnum,
  ButtonTypeEnum,
  InputEnum,
  SizeEnum,
  FormValues,
  ErrorResponse
} from '~/types'
import {
  initialValues,
  validations
} from '~/containers/edit-profile/password-security-tab/PasswordSecurityTab.constants'

const ChangePasswordModal = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { userId } = useAppSelector((state) => state.appMain)
  const { checkConfirmation } = useConfirm()
  const { closeModal } = useModalContext()

  const handleSubmitChangePassword = async () => {
    const confirmed = await checkConfirmation({
      message: t(
        'editProfilePage.profile.passwordSecurityTab.changePasswordConfirm'
      ),
      title: 'titles.confirmTitle',
      check: true
    })
    if (confirmed) {
      resetErrors()
      await sendChangedPassword({
        password: data.password,
        currentPassword: data.currentPassword
      })
    }
  }

  const handleResponse = () => {
    dispatch(
      openAlert({
        severity: snackbarVariants.success,
        message: 'editProfilePage.profile.successMessage'
      })
    )
    closeModal()
  }

  const changePassword = useCallback(
    (data: { password: string; currentPassword: string }) => {
      return AuthService.changePassword(userId, data)
    },
    [userId]
  )

  const handleResponseError = (error?: ErrorResponse) => {
    if (error?.code === 'INCORRECT_CREDENTIALS') {
      handleErrors('password', t('common.errorMessages.samePasswords'))
    } else {
      handleErrors('currentPassword', t('common.errorMessages.currentPassword'))
    }
  }

  const { loading, fetchData: sendChangedPassword } = useAxios({
    service: changePassword,
    onResponse: handleResponse,
    onResponseError: handleResponseError,
    fetchOnMount: false
  })

  const {
    data,
    handleSubmit,
    handleInputChange,
    errors,
    handleBlur,
    resetData,
    resetErrors,
    handleErrors
  } = useForm<FormValues>({
    onSubmit: handleSubmitChangePassword,
    initialValues: initialValues,
    validations: validations
  })

  const {
    inputVisibility: currentPasswordVisibility,
    showInputText: showCurrentPassword
  } = useInputVisibility(errors.currentPassword)

  const { inputVisibility: passwordVisibility, showInputText: showPassword } =
    useInputVisibility(errors.password)

  const {
    inputVisibility: newPasswordVisibility,
    showInputText: showNewPassword
  } = useInputVisibility(errors.confirmPassword)

  const onDiscard = () => {
    resetData()
    resetErrors()
    closeModal()
  }

  const saveButtonContent = loading ? (
    <Loader size={20} />
  ) : (
    t('editProfilePage.profile.passwordSecurityTab.savePassword')
  )

  const inputType = (isVisible: boolean) =>
    isVisible ? InputEnum.Text : InputEnum.Password

  return (
    <Box sx={styles.modalContainer}>
      <Box sx={styles.container}>
        <Typography sx={styles.titleAndDescription}>
          {t('editProfilePage.profile.passwordSecurityTab.changePassword')}
        </Typography>
        <Typography sx={styles.subtitle}>
          {t(
            'editProfilePage.profile.passwordSecurityTab.changePasswordModalDescription'
          )}
        </Typography>
        <Box component={ComponentEnum.Form} onSubmit={handleSubmit}>
          <Box sx={styles.form}>
            <AppTextField
              InputProps={currentPasswordVisibility}
              errorMsg={t(errors.currentPassword)}
              fullWidth
              label={t(
                'editProfilePage.profile.passwordSecurityTab.currentPassword'
              )}
              onBlur={handleBlur('currentPassword')}
              onChange={handleInputChange('currentPassword')}
              type={inputType(showCurrentPassword)}
              value={data.currentPassword}
            />
            <AppTextField
              InputProps={passwordVisibility}
              errorMsg={t(errors.password)}
              fullWidth
              label={t(
                'editProfilePage.profile.passwordSecurityTab.newPassword'
              )}
              onBlur={handleBlur('password')}
              onChange={handleInputChange('password')}
              type={inputType(showPassword)}
              value={data.password}
            />
            <AppTextField
              InputProps={newPasswordVisibility}
              errorMsg={t(errors.confirmPassword)}
              fullWidth
              label={t(
                'editProfilePage.profile.passwordSecurityTab.retypePassword'
              )}
              onBlur={handleBlur('confirmPassword')}
              onChange={handleInputChange('confirmPassword')}
              type={inputType(showNewPassword)}
              value={data.confirmPassword}
            />
          </Box>
          <Box sx={styles.passwordButtonsContainer}>
            <AppButton
              onClick={onDiscard}
              size={SizeEnum.Large}
              sx={styles.discardButton}
              variant={ButtonVariantEnum.Tonal}
            >
              {t('common.cancel')}
            </AppButton>
            <AppButton
              size={SizeEnum.Large}
              sx={styles.saveButton}
              type={ButtonTypeEnum.Submit}
              variant={ButtonVariantEnum.Contained}
            >
              {saveButtonContent}
            </AppButton>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ChangePasswordModal
