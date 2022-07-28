import { useContext } from 'react'
import { Box, TextField, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { ModalContext } from '~/context/modal-context'
import useForm from '~/hooks/use-form'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import ResetPasswordInfo from '~/containers/guest-home-page/reset-password-info/ResetPasswordInfo'
import { email } from '~/constants/validation/login'
import { style } from '~/containers/guest-home-page/forgot-password/forgot-password.style'

const ForgotPassword = () => {
  const { t } = useTranslation()
  const { setModal } = useContext(ModalContext)

  const backToLogin = () => {
    setModal(<LoginDialog />)
  }

  const { handleSubmit, handleChange, handleBlur, errors, data } = useForm({
    onSubmit: () => setModal(<ResetPasswordInfo email={ data.email } />),
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
        <TextField
          autoFocus
          error={ Boolean(errors.email) }
          fullWidth
          helperText={ t(errors.email) }
          label={ t('common.labels.email') }
          onBlur={ handleBlur('email') }
          onChange={ handleChange('email') }
          required
          size="large"
          sx={ { mb: '16px' } }
          type="email"
          value={ data.email }
        />

        <Button
          size="large" sx={ style.sentPass } type="submit"
          variant="contained"
        >
          { t('login.sendPassword') }
        </Button>
      </Box>

      <Button
        onClick={ backToLogin } size="large" sx={ style.backBtn }
        variant="text"
      >
        { t('login.backToLogin') }
      </Button>
    </Box>
  )
}

export default ForgotPassword
