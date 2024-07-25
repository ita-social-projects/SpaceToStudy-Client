import { useCallback, useState, FC } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'

import Loader from '~/components/loader/Loader'
import AppButton from '~/components/app-button/AppButton'
import AppTextField from '~/components/app-text-field/AppTextField'
import { snackbarVariants } from '~/constants'

import useForm from '~/hooks/use-form'
import useChangeUserStatus from '~/hooks/use-change-user-status'
import useAxios from '~/hooks/use-axios'
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'
import useInputVisibility from '~/hooks/use-input-visibility'
import useConfirm from '~/hooks/use-confirm'

import { AuthService } from '~/services/auth-service'
import { openAlert } from '~/redux/features/snackbarSlice'

import { styles } from '~/containers/edit-profile/password-security-tab/PasswordSecurityTab.styles'
import PasswordSecurityItem from './password-security-item/PasswordSecurityItem'

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

const PasswordSecurityTab: FC = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { userId } = useAppSelector((state) => state.appMain)
  const { checkConfirmation } = useConfirm()

  const { neededAction, checkStatusChange } = useChangeUserStatus()

  const [isModalOpen, setIsModalOpen] = useState(false)

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
    setIsModalOpen(false)
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

  const openChangePasswordModal = () => {
    setIsModalOpen(true)
  }

  const closeChangePasswordModal = () => {
    setIsModalOpen(false)
  }

  const handleChangeStatusClick = () => {
    void checkStatusChange(
      `editProfilePage.profile.passwordSecurityTab.${neededAction}Title`,
      `editProfilePage.profile.passwordSecurityTab.${neededAction}Description`,
      true
    )
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

  const onDiscard = () => {
    resetData()
    resetErrors()
    closeChangePasswordModal()
  }

  const saveButtonContent = loading ? (
    <Loader size={20} />
  ) : (
    t('editProfilePage.profile.passwordSecurityTab.savePassword')
  )

  const inputType = (isVisible: boolean) =>
    isVisible ? InputEnum.Text : InputEnum.Password

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
      <Modal onClose={closeChangePasswordModal} open={isModalOpen}>
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
                  datatest-id={'cancelButton'}
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
      </Modal>
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
