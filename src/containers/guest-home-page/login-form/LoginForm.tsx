import { useTranslation } from 'react-i18next'
import useInputVisibility from '~/hooks/use-input-visibility'
import { useAppSelector } from '~/hooks/use-redux'

import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

import { useModalContext } from '~/context/modal-context'
import ForgotPassword from '~/containers/guest-home-page/forgot-password/ForgotPassword'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppButton from '~/components/app-button/AppButton'

import { styles } from '~/containers/guest-home-page/login-form/LoginForm.styles'

interface LoginFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleChange: (
    name: string
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void
  handleBlur: (name: string) => (e: React.FocusEvent<HTMLInputElement>) => void
  data: {
    email: string
    password: string
    rememberMe: boolean
  }
  errors: {
    email?: string
    password?: string
  }
}

const LoginForm: React.FC<LoginFormProps> = ({
  handleSubmit,
  handleChange,
  handleBlur,
  data,
  errors
}) => {
  const { inputVisibility: passwordVisibility, showInputText: showPassword } =
    useInputVisibility(errors.password ?? '')

  const { authLoading } = useAppSelector((state) => state.appMain)

  const { openModal } = useModalContext()

  const { t } = useTranslation()

  const openForgotPassword = () => {
    openModal({ component: <ForgotPassword /> })
  }

  const handleCheckboxChange = (
    event: React.SyntheticEvent<Element, Event>,
    checked: boolean
  ) => {
    const target = event.target as HTMLInputElement
    const changeEvent = {
      ...event,
      target: {
        ...target,
        value: checked.toString()
      }
    } as React.ChangeEvent<HTMLInputElement>
    handleChange(target.name)(changeEvent)
  }

  return (
    <Box component='form' onSubmit={handleSubmit} sx={styles.form}>
      <AppTextField
        autoFocus
        data-testid={'email'}
        errorMsg={t(errors.email ?? '')}
        fullWidth
        label={t('common.labels.email')}
        onBlur={handleBlur('email')}
        onChange={handleChange('email')}
        required
        size='medium'
        sx={{ mb: '5px' }}
        type='email'
        value={data.email}
      />

      <AppTextField
        InputProps={passwordVisibility}
        errorMsg={t(errors.password ?? '')}
        fullWidth
        label={t('common.labels.password')}
        onBlur={handleBlur('password')}
        onChange={handleChange('password')}
        required
        type={showPassword ? 'text' : 'password'}
        value={data.password}
      />

      <Box sx={styles.loginOptionsContainer}>
        <FormControlLabel
          control={<Checkbox checked={data.rememberMe} name='rememberMe' />}
          label={t('login.rememberMe')}
          labelPlacement='end'
          onChange={handleCheckboxChange}
          sx={styles.checkboxLabel}
          value={data.rememberMe}
        />

        <Typography
          component={ButtonBase}
          onClick={openForgotPassword}
          sx={styles.forgotPass}
          variant='subtitle2'
        >
          {t('login.forgotPassword')}
        </Typography>
      </Box>

      <AppButton
        disabled={!data.email || !data.password}
        loading={authLoading}
        sx={styles.loginButton}
        type='submit'
      >
        {t('common.labels.login')}
      </AppButton>
    </Box>
  )
}

export default LoginForm
