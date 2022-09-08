import { useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import useForm from '~/hooks/use-form'
import useAxios from '~/hooks/use-axios'
import useInputVisibility from '~/hooks/use-input-visibility'

import { AuthService } from '~/services/auth-service'
import { ModalContext } from '~/context/modal-context'
import { SnackBarContext } from '~/context/snackbar-context'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

import AppTextField from '~/components/app-text-field/AppTextField'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import LoginDialog from '../login-dialog/LoginDialog'
import Loader from '~/components/loader/Loader'

import { confirmPassword, password } from '~/utils/validations/login'
import { snackbarVariants } from '~/constants'

const styles = {
  root: { p: { xs: '100px 10px', sm: '56px', md: '70px' }, width: '400px' },
  wrapper: { maxWidth: '630px' },
  title: { typography: 'h4' },
  description: { typography: 'subtitle' },
  form: { display: 'flex', flexDirection: 'column' }
}

const ResetPassword = ({ resetToken }) => {
  const { t } = useTranslation()
  const { setModal } = useContext(ModalContext)
  const { setAlert } = useContext(SnackBarContext)

  const {
    response,
    error,
    loading,
    fetchData: sendResetPassword
  } = useAxios({
    service: (newPassword) => AuthService.resetPassword(resetToken, newPassword),
    fetchOnMount: false
  })

  useEffect(() => {
    if (error) {
      setAlert({
        severity: snackbarVariants.error,
        message: `errors.${error.response.data.code}`
      })
    } else if (response) {
      setModal(<LoginDialog />)
    }
  }, [error, response, setAlert, setModal])

  const { handleSubmit, handleChange, handleBlur, errors, data } = useForm({
    onSubmit: () => sendResetPassword({ password: data.password }),
    initialValues: { password: '', confirmPassword: '' },
    validations: { password, confirmPassword }
  })

  const { inputVisibility: passwordVisibility, showInputText: showPassword } = useInputVisibility(errors.password)
  const { inputVisibility: confirmPasswordVisibility, showInputText: showConfirmPassword } = useInputVisibility(
    errors.confirmPassword
  )

  return (
    <Box sx={ styles.root }>
      <TitleWithDescription
        description={ t('login.resetPasswordDesc') }
        descriptionStyles={ styles.description }
        title={ t('login.newPassword') }
        titleStyles={ styles.title }
      />
      <Box component='form' onSubmit={ handleSubmit } sx={ styles.form }>
        <AppTextField
          InputProps={ passwordVisibility }
          errorMsg={ t(errors.password) }
          fullWidth
          label={ t('common.labels.password') }
          onBlur={ handleBlur('password') }
          onChange={ handleChange('password') }
          required
          size='large'
          sx={ { mb: '5px' } }
          type={ showPassword ? 'text' : 'password' }
          value={ data.password }
        />
        <AppTextField
          InputProps={ confirmPasswordVisibility }
          errorMsg={ t(errors.confirmPassword) }
          fullWidth
          label={ t('common.labels.confirmPassword') }
          onBlur={ handleBlur('confirmPassword') }
          onChange={ handleChange('confirmPassword') }
          required
          size='large'
          type={ showConfirmPassword ? 'text' : 'password' }
          value={ data.confirmPassword }
        />
        <Button
          disabled={ loading } fullWidth size='large'
          type='submit' variant='contained'
        >
          { loading ? <Loader size={ 20 } /> : t('login.savePassword') }
        </Button>
      </Box>
    </Box>
  )
}

export default ResetPassword
