import { useContext } from 'react'
import { Box, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { ModalContext } from '~/context/modal-context'
import useForm from '~/hooks/use-form'

import AppTextField from '~/components/app-text-field/AppTextField'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import ResetPasswordSuccess from '~/containers/guest-home-page/reset-password-success/ResetPasswordSuccess'

import { email } from '~/constants/validation/login'
import { style } from '~/containers/guest-home-page/forgot-password/forgot-password.style'

const ForgotPassword = () => {
  const { t } = useTranslation()
  const { setModal } = useContext(ModalContext)

  const backToLogin = () => {
    setModal(<LoginDialog />)
  }

  const { handleSubmit, handleChange, handleBlur, errors, data } = useForm({
    onSubmit: () => setModal(<ResetPasswordSuccess email={ data.email } />),
    initialValues: { email: '' },
    validations: { email }
  })

  return (
    <Box sx={ style.root }>
      <TitleWithDescription
        componentStyles={ style.wrapper }
        description={ t('login.enterEmail') }
        descriptionStyles={ style.description }
        title={ t('login.forgotPassword') }
        titleStyles={ style.title }
      />

      <Box component="form" onSubmit={ handleSubmit }>
        <AppTextField
          autoFocus
          errorMsg={ t(errors.email) }
          fullWidth
          label={ t('common.labels.email') }
          onBlur={ handleBlur('email') }
          onChange={ handleChange('email') }
          required
          size="large"
          sx={ { mb: '5px' } }
          type="email"
          value={ data.email }
        />

        <Button
          size="large" sx={ style.sentPassword } type="submit"
          variant="contained"
        >
          { t('login.sendPassword') }
        </Button>
      </Box>

      <Button
        onClick={ backToLogin } size="large" sx={ style.backButton }
        variant="text"
      >
        { t('login.backToLogin') }
      </Button>
    </Box>
  )
}

export default ForgotPassword
