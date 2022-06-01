import { useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import GoogleLogin from '~/containers/google-login/GoogleLogin'
import LoginForm from '~/containers/login-form/LoginForm'
import useForm from '~/hooks/use-form'
import useConfirm from '~/hooks/use-confirm'
import usePrompt from '~/hooks/use-prompt'
import { email, password } from '~/constants/validation/login'
import login from '~/assets/img/login-dialog/login.svg'
import style from '~/containers/login-dialog/login-dialog.style'

const LoginDialog = () => {
  const { t } = useTranslation()
  const { setNeedConfirmation } = useConfirm()
  const { setPrompt } = usePrompt()

  const { handleSubmit, handleChange, handleBlur, data, isDirty, errors } = useForm(
    {
      onSubmit: () => console.log({ data, isDirty }),
      initialValues: { email: '', password: '' },
      validations: { email, password }
    }
  )

  useEffect(() => {
    setNeedConfirmation(isDirty)
    setPrompt(isDirty)
  }, [isDirty, setNeedConfirmation, setPrompt])

  return (
    <Box sx={ style.root }>
      <Box
        alt="login" component='img' src={ login }
        sx={ style.img }
      />
      
      <Box sx={ style.form }>
        <Box component='hr' sx={ style.hr } />
        <Typography sx={ style.h2 } variant="h2">
          { t( 'login.head' ) }
        </Typography>
        
        <LoginForm
          data={ data } errors={ errors } handleBlur={ handleBlur }
          handleChange={ handleChange } handleSubmit={ handleSubmit }
        />

        <GoogleLogin />
      </Box>
    </Box>
  )
}

export default LoginDialog
