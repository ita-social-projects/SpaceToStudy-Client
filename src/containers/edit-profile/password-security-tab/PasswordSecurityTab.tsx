import { useState, useCallback, FC, ChangeEvent, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
// import { useSelector } from 'react-redux'
import { useBlocker } from 'react-router-dom'

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
import useConfirm from '~/hooks/use-confirm'
import { useAppDispatch } from '~/hooks/use-redux'
import useInputVisibility from '~/hooks/use-input-visibility'

import { userService } from '~/services/user-service'
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

  const { setNeedConfirmation, checkConfirmation } = useConfirm()

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
    (passwords: FormValues) => userService.changePassword(user._id, passwords),
    [user._id]
  )

  const handleResponseError = (error?: ErrorResponse) => {
    if (error?.code === 'INCORRECT_CREDENTIALS') {
      setSamePasswordError(t('common.errorMessages.samePasswords'))
    } else {
      setCurrentPasswordError(t('common.errorMessages.currentPassword'))
    }
    console.error('Error response:', error)
  }

  const { loading, fetchData: sendResetPassword } = useAxios({
    service: changePassword,
    onResponse: handleResponse,
    onResponseError: handleResponseError,
    fetchOnMount: false,
    defaultResponse: null
  })

  const validateNewPassword = (newPassword) => {
    if (!newPassword) {
      return emptyField(newPassword)
    }
    return password(newPassword)
  }

  const {
    isDirty,
    data,
    handleSubmit,
    handleInputChange,
    errors,
    handleBlur,
    resetData,
    resetErrors
  } = useForm<FormValues>({
    onSubmit: async () => {
      console.log('Form submitted with data:', data)
      setSamePasswordError('')
      setCurrentPasswordError('')
      try {
        await sendResetPassword({
          password: data.password,
          currentPassword: data.currentPassword
        })
      } catch (error) {
        console.error('Password reset failed:', error)
      }
    },
    initialValues: {
      currentPassword: '',
      password: '',
      confirmPassword: ''
    },
    validations: {
      currentPassword: password,
      password: (password) => validateNewPassword(password),
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
  } = useInputVisibility(currentPasswordError)

  const { inputVisibility: passwordVisibility, showInputText: showPassword } =
    useInputVisibility(errors.password)

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
        <AppTextField
          InputProps={currentPasswordVisibility}
          errorMsg={currentPasswordError}
          fullWidth
          label={t(
            'editProfilePage.profile.passwordSecurityTab.currentPassword'
          )}
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
