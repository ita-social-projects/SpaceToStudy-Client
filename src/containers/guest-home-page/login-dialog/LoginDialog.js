import { useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import GoogleLogin from '~/containers/guest-home-page/google-login/GoogleLogin'
import LoginForm from '~/containers/guest-home-page/login-form/LoginForm'
import useForm from '~/hooks/use-form'
import useConfirm from '~/hooks/use-confirm'
import { email, password } from '~/constants/validation/login'
import login from '~/assets/img/login-dialog/login.svg'
import { constants } from '~/constants/common'
import style from '~/containers/guest-home-page/login-dialog/login-dialog.style'

const LoginDialog = () => {
  const { t } = useTranslation()
  const { setNeedConfirmation } = useConfirm()

  const { handleSubmit, handleChange, handleBlur, data, isDirty, errors } = useForm(
    {
      onSubmit: () => console.log({ data, isDirty }),
      initialValues: { email: '', password: '' },
      validations: { email, password }
    }
  )

  useEffect(() => {
    setNeedConfirmation(isDirty)
  }, [isDirty, setNeedConfirmation])

  return (
    <Box sx={ style.root }>
      
      <Box sx={ style.img }>
        <Box
          alt="login" component='img' src={ login }
          sx={ style.img }
        />
      </Box>
      
      <Box sx={ style.form }>
        <Box component='hr' sx={ style.hr } />
        <Typography sx={ style.h2 } variant="h2">
          { t( 'login.head' ) }
        </Typography>
        
        <LoginForm
          data={ data } errors={ errors } handleBlur={ handleBlur }
          handleChange={ handleChange } handleSubmit={ handleSubmit }
        />

        <GoogleLogin type={ constants.login } />
      </Box>
    </Box>
  )
}

export default LoginDialog
