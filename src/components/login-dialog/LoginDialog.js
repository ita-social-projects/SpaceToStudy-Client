import { useState,useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Box, FormControl, FormControlLabel, Typography, TextField, Button, Checkbox } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ModalContext } from '~/context/modal-context'

import ForgotPaaword from '../forgot-password/ForgotPassword'
import useForm from '~/hooks/use-form'
import useConfirm from '~/hooks/use-confirm'
import usePrompt from '~/hooks/use-prompt'
import { endAdornment } from '~/services/isVisible'
import { routes } from '~/constants/routes'
import { email, password } from '~/constants/validation/login'
import login from '~/assets/img/login-dialog/login.svg'
import google from '~/assets/img/login-dialog/google.svg'
import style from './loginDialog.style'

const LoginDialog = () => {
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = useState(true)
  const { setModal } = useContext(ModalContext)
  const { setNeedConfirmation } = useConfirm()
  const { setPrompt } = usePrompt()

  const handleModal = () => {
    setModal(<ForgotPaaword />)
  }

  const { handleSubmit, handleChange, handleBlur, data, dirty, errors } = useForm(
    {
      onSubmit: () => console.log({ data, dirty }),
      initialValues: { email: '', password: '', rememberMe: false },
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
        
        <Box component='form' onSubmit={ handleSubmit }>
          <TextField
            error={ errors?.email?.error }
            fullWidth 
            helperText={ t(errors?.email?.helperText) }
            label={ t( 'login.email' ) }
            onBlur={ handleBlur('email') }
            onChange={ handleChange('email') }
            required
            size='large'
            sx={ { mb: '16px' } }
            type='email'
            value={ data.email }
          ></TextField>
          <TextField 
            InputProps={ endAdornment( showPassword, setShowPassword ) }
            error={ errors?.password?.error }
            fullWidth 
            helperText={ t(errors?.password?.helperText) }
            label={ t( 'login.password' ) }
            onBlur={ handleBlur('password') }
            onChange={ handleChange('password') }
            required
            type='password'
            value={ data.password }
          ></TextField>
        
          <Box sx={ style.checkboxContainer } >
            <FormControlLabel
              checked={ data.rememberMe }
              control={ <Checkbox /> }
              label={ t( 'login.rememberMe' ) }
              labelPlacement='end'
              onChange={ handleChange('rememberMe') }
              size='large'
              sx={ style.checkboxLabel }
              variant='subtitle2'
            />
            <Typography onClick={ handleModal } sx={ style.underlineText } variant='subtitle2'>
              { t( 'login.forgotPassword' ) }
            </Typography>
          </Box>
        
          <Button
            size='large' sx={ style.loginButton } type='submit'
            variant="contained"
          >
            { t( 'login.loginButton' ) }
          </Button>
        
          <Box sx={ style.linesBox }>
            <Box sx={ style.line } />
            <Typography variant="overline">
              { t( 'login.continue' ) }
            </Typography>
            <Box sx={ style.line } />
          </Box>
        
          <Button size='large' sx={ style.google } variant="outlined">
            <Box
              alt="google icon" component='img' src={ google }
              sx={ { pr: 1 } }
            />
            { t('login.googleButton') }
          </Button>
        
          <Box sx={ { display: 'flex' } }>
            <Typography sx={ { pr: 1 } } variant="body2">
              { t( 'login.haveAccount' ) }
            </Typography>
            <Typography
              component={ Link }
              onClick={ () => setModal() }
              sx={ style.underlineText } to={ routes.guestNavBar.whatCanYouDo.route }
              variant="body2"
            >
              { t( 'login.joinUs' ) }
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default LoginDialog
