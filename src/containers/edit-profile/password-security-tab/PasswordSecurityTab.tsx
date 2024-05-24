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

import { emptyField } from '~/utils/validations/common'

import { confirmPassword, password } from '~/utils/validations/login'
import { ButtonVariantEnum, InputEnum, SizeEnum } from '~/types'
import { FormValues } from '~/types/edit-user-profile/interfaces/securityBlockForm.interfaces'
import { styles } from '~/containers/edit-profile/password-security-tab/PasswordSecurityTab.styles'
import { confirmPassword, password } from '~/utils/validations/login'
import {
  ButtonVariantEnum,
  InputEnum,
  SizeEnum,
  FormValues,
  UserResponse,
  ErrorResponse
} from '~/types'

interface PasswordSecurityTabProps {
  user: UserResponse
}

const PasswordSecurityTab: FC<PasswordSecurityTabProps> = ({ user }) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false)
  const [samePasswordError, setSamePasswordError] = useState<string>('')
  const [currentPasswordError, setCurrentPasswordError] = useState<string>('')

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
      setSamePasswordError(t('common.errorMessages.samePasswords'))
    } else {
      setCurrentPasswordError(t('common.errorMessages.currentPassword'))
    }
  }

  const { loading, fetchData: sendChangedPassword } = useAxios({
    service: changePassword,
    onResponse: handleResponse,
    onResponseError: handleResponseError,
    fetchOnMount: false,
    defaultResponse: null
  })

  const validateNewPassword = (newPassword: string) => {
    if (!newPassword) {
      return emptyField({ value: newPassword })
    }
    return password(newPassword)
  }

  const validateCurrentPassword = (currentPassword: string) => {
    if (!currentPassword) {
      return emptyField({ value: currentPassword })
    }
    return password(currentPassword)
  }

  const {
    data,
    handleSubmit,
    handleInputChange,
    errors,
    handleBlur,
    resetData,
    resetErrors
  } = useForm<FormValues>({
    onSubmit: async () => {
      setSamePasswordError('')
      setCurrentPasswordError('')
      await sendChangedPassword({
        password: data.password,
        currentPassword: data.currentPassword
      })
    },
    initialValues: {
      currentPassword: '',
      password: '',
      confirmPassword: ''
    },
    validations: {
      currentPassword: validateCurrentPassword,
      password: validateNewPassword,
      confirmPassword
    }
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
  } = useInputVisibility(errors.currentPassword || currentPasswordError)

  const { inputVisibility: passwordVisibility, showInputText: showPassword } =
    useInputVisibility(errors.password || samePasswordError)

  const {
    inputVisibility: newPasswordVisibility,
    showInputText: showNewPassword
  } = useInputVisibility(errors.confirmPassword)

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSamePasswordError('')
    handleInputChange('password')(e)
  }

  const handleCurrentPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPasswordError('')
    handleInputChange('currentPassword')(e)
  }

  const onDiscard = () => {
    resetData()
    setSamePasswordError('')
    setCurrentPasswordError('')
    resetErrors()
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
      <Box component='form' onSubmit={handleSubmit}>
        <Typography sx={styles.subtitle}>
          {t('editProfilePage.profile.passwordSecurityTab.changePassword')}
        </Typography>
        <Box sx={styles.form}>
          <AppTextField
            InputProps={currentPasswordVisibility}
            errorMsg={t(errors.currentPassword) || currentPasswordError}
            fullWidth
            label={t(
              'editProfilePage.profile.passwordSecurityTab.currentPassword'
            )}
            onBlur={handleBlur('currentPassword')}
            onChange={handleCurrentPasswordChange}
            type={showCurrentPassword ? 'text' : InputEnum.Password}
            value={data.currentPassword}
          />
          <AppTextField
            InputProps={passwordVisibility}
            errorMsg={samePasswordError || t(errors.password)}
            fullWidth
            label={t('editProfilePage.profile.passwordSecurityTab.newPassword')}
            onBlur={handleBlur('password')}
            onChange={handlePasswordChange}
            type={showPassword ? 'text' : InputEnum.Password}
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
            type={showNewPassword ? 'text' : InputEnum.Password}
            value={data.confirmPassword}
          />
        </Box>
        <Box sx={styles.passwordButtonsContainer}>
          <AppButton
            size={SizeEnum.Large}
            type='submit'
            variant={ButtonVariantEnum.Contained}
          >
            {loading ? (
              <Loader size={20} />
            ) : (
              t('editProfilePage.profile.passwordSecurityTab.savePassword')
            )}
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
