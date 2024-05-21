import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import AppButton from '~/components/app-button/AppButton'
import AppTextField from '~/components/app-text-field/AppTextField'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import useForm from '~/hooks/use-form'
import useChangeUserStatus from '~/hooks/use-change-user-status'
import useAxios from '~/hooks/use-axios'
import { useSelector } from 'react-redux'
import { userService } from '~/services/user-service'
import useInputVisibility from '~/hooks/use-input-visibility'

import { emptyField } from '~/utils/validations/common'

import { confirmPassword, password } from '~/utils/validations/login'
import { ButtonVariantEnum, InputEnum, SizeEnum } from '~/types'
import { FormValues } from '~/types/edit-user-profile/interfaces/securityBlockForm.interfaces'
import { styles } from '~/containers/edit-profile/password-security-tab/PasswordSecurityTab.styles'
import { confirmPassword, password as psw } from '~/utils/validations/login'
import { ButtonVariantEnum, InputEnum, SizeEnum, FormValues } from '~/types'

const validatePassword = (password, samePasswordError) => {
  if (psw(password)) {
    return true
  }
  if (!password) {
    return emptyField(
      password,
      'common.errorMessages.emptyField',
      samePasswordError !== '' ? samePasswordError : ''
    )
  }
  return ''
}

const PasswordSecurityTab = () => {
  const { t } = useTranslation()
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const store = useSelector((state) => state.appMain)
  const [samePasswordError, setSamePasswordError] = useState('')
  const [currentPasswordError, setCurrentPasswordError] = useState('')

  const { fetchData: sendResetPassword } = useAxios({
    service: (passwords) => {
      return userService.changePassword(store.userId, passwords)
    },
    onResponseError: (error) => {
      if (error.code === 'INCORRECT_CREDENTIALS') {
        setSamePasswordError(t('common.errorMessages.samePasswords'))
      } else {
        setCurrentPasswordError(t('common.errorMessages.currentPassword'))
      }
      console.error('Error response:', error)
    },
    fetchOnMount: false,
    defaultResponse: null
  })

  const validateCurrentPassword = (currentPassword) => {
    if (!currentPassword) {
      return t('common.errorMessages.emptyField')
    }
    return ''
  }

  const {
    data,
    handleSubmit,
    handleInputChange,
    errors,
    handleBlur,
    resetData
  } = useForm<FormValues>({
    onSubmit: () => {
      console.log('Form submitted with data:', data)
      setSamePasswordError('')
      setCurrentPasswordError('')
      sendResetPassword({
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
      password: (password) => validatePassword(password, samePasswordError),
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

  const handlePasswordChange = (e) => {
    setSamePasswordError('')
    handleInputChange('password')(e)
    console.log('Password changed:', e.target.value)
  }

  const handleCurrentPasswordChange = (e) => {
    setCurrentPasswordError('')
    handleInputChange('currentPassword')(e)
    console.log('Current password changed:', e.target.value)
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
          // onChange={handleInputChange('currentPassword')}
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
          // onChange={handleInputChange('password')}
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
