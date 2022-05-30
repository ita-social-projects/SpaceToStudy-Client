import { useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import GoogleLogin from '../google-login/GoogleLogin'
import LoginForm from '../login-form/LoginForm'
import useForm from '~/hooks/use-form'
import useConfirm from '~/hooks/use-confirm'
import usePrompt from '~/hooks/use-prompt'
import { email, password } from '~/constants/validation/login'
import login from '~/assets/img/login-dialog/login.svg'
import style from './loginDialog.style'

const LoginDialog = () => {
  const { t } = useTranslation()
  const { setNeedConfirmation } = useConfirm()
  const { setPrompt } = usePrompt()

  const { handleSubmit, handleChange, handleBlur, data, dirty, errors } = useForm(
    {
      onSubmit: () => console.log({ data, dirty }),
      initialValues: { email: '', password: '' },
      validationSchema: { email, password }
    }
  )

  useEffect(() => {
    setNeedConfirmation(dirty)
    setPrompt(dirty)
  }, [dirty, setNeedConfirmation, setPrompt])

  return (
    <Box sx={ style.root }>
      <Box
        alt="login" component='img' src={ login }
        sx={ style.img }
      />
      
      <Box sx={ style.form }>
        <Typography sx={ style.h2 } variant="h2">
          { t( 'login.head' ) }
        </Typography>
        
        <LoginForm
          data={ data } dirty={ dirty } errors={ errors }
          handleBlur={ handleBlur } handleChange={ handleChange } handleSubmit={ handleSubmit }
        />

        <GoogleLogin />
      </Box>
    </Box>
  )
}

export default LoginDialog
