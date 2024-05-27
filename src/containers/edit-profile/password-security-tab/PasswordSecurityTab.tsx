import { useState, useCallback, FC, ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import Loader from '~/components/loader/Loader'
import AppButton from '~/components/app-button/AppButton'
import AppTextField from '~/components/app-text-field/AppTextField'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { snackbarVariants } from '~/constants'

import useForm from '~/hooks/use-form'
import useChangeUserStatus from '~/hooks/use-change-user-status'
import useAxios from '~/hooks/use-axios'
import { useAppDispatch } from '~/hooks/use-redux'
import useInputVisibility from '~/hooks/use-input-visibility'

import { AuthService } from '~/services/auth-service'
import { openAlert } from '~/redux/features/snackbarSlice'

import { styles } from '~/containers/edit-profile/password-security-tab/PasswordSecurityTab.styles'

import {
  ButtonVariantEnum,
  ComponentEnum,
  ButtonTypeEnum,
  InputEnum,
  SizeEnum,
  FormValues,
  ErrorResponse,
  EditProfileTabUserProps
} from '~/types'
import {
  initialValues,
  validations
} from '~/containers/edit-profile/password-security-tab/PasswordSecurityTab.constants'

const PasswordSecurityTab: FC<EditProfileTabUserProps> = ({ user }) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const handleResponse = () => {
    dispatch(
      openAlert({
        severity: snackbarVariants.success,
        message: 'editProfilePage.profile.successMessage'
      })
    )
  }

  const changePassword = useCallback(
    (data: { password: string; currentPassword: string }) => {
      return AuthService.changePassword(user._id, data)
    },
    [user._id]
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
    onSubmit: async () => {
      resetErrors()
      await sendChangedPassword({
        password: data.password,
        currentPassword: data.currentPassword
      })
    },
    initialValues: initialValues,
    validations: validations
  })

  const handleChangeStatusClick = () => {
    checkStatusChange(
      `editProfilePage.profile.passwordSecurityTab.${neededAction}Title`,
      `editProfilePage.profile.passwordSecurityTab.${neededAction}Description`,
      true
    ).catch(console.error)
  }

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

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleErrors('password', '')
    handleInputChange('password')(e)
  }

  const handleCurrentPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleErrors('currentPassword', '')
    handleInputChange('currentPassword')(e)
  }

  const onDiscard = () => {
    resetData()
    resetErrors()
  }

  const saveButtonContent = loading ? (
    <Loader size={20} />
  ) : (
    t('editProfilePage.profile.passwordSecurityTab.savePassword')
  )

  const inputType = (isVisible: boolean) =>
    isVisible ? InputEnum.Text : InputEnum.Password

  return (
    <Box sx={styles.container}>
      <TitleWithDescription
        description={t(
          'editProfilePage.profile.passwordSecurityTab.description'
        )}
        style={styles.titleAndDescription}
        title={t('editProfilePage.profile.passwordSecurityTab.title')}
      />
      <Box component={ComponentEnum.Form} onSubmit={handleSubmit}>
        <Typography sx={styles.subtitle}>
          {t('editProfilePage.profile.passwordSecurityTab.changePassword')}
        </Typography>
        <Box sx={styles.form}>
          <AppTextField
            InputProps={currentPasswordVisibility}
            errorMsg={t(errors.currentPassword)}
            fullWidth
            label={t(
              'editProfilePage.profile.passwordSecurityTab.currentPassword'
            )}
            onBlur={handleBlur('currentPassword')}
            onChange={handleCurrentPasswordChange}
            type={inputType(showCurrentPassword)}
            value={data.currentPassword}
          />
          <AppTextField
            InputProps={passwordVisibility}
            errorMsg={t(errors.password)}
            fullWidth
            label={t('editProfilePage.profile.passwordSecurityTab.newPassword')}
            onBlur={handleBlur('password')}
            onChange={handlePasswordChange}
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
            size={SizeEnum.Large}
            sx={styles.saveButton}
            type={ButtonTypeEnum.Submit}
            variant={ButtonVariantEnum.Contained}
          >
            {saveButtonContent}
          </AppButton>
          <AppButton
            onClick={onDiscard}
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
