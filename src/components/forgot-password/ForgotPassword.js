import { useEffect, useContext } from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { ModalContext } from '~/context/modal-context'
import useForm from '~/hooks/use-form'
import useConfirm from '~/hooks/use-confirm'
import usePrompt from '~/hooks/use-prompt'
import LoginDialog from '../login-dialog/LoginDialog'
import InfoPopup from '../info-popup/InfoPopup'
import { email } from '~/constants/validation/login'
import style from './forgotPassword.style'

const ForgotPaaword = () => {
  const { t } = useTranslation()
  const { setModal } = useContext(ModalContext)
  const { setNeedConfirmation } = useConfirm()
  const { setPrompt } = usePrompt()

  const handleModal = () => {
    setModal(<LoginDialog />)
  }

  const openInfo = () => {
    console.log({ data })
    setModal(
      <InfoPopup afterEmail='login.emailArrive' beforeEmail='login.weSentEmail' email={ data.email } />
    )
  }

  const { handleSubmit, handleChange, handleBlur, data,dirty, errors } = useForm(
    {
      onSubmit: openInfo,
      initialValues: { email: '' },
      validationSchema: { email }
    }
  )

  useEffect(() => {
    setNeedConfirmation(dirty)
    setPrompt(dirty)
  }, [dirty, setNeedConfirmation, setPrompt])

  return (
    <Box sx={ style.root }>
      <Typography sx={ style.h2 } variant='h2'>
        { t( 'login.forgotPassword' ) }
      </Typography>
      <Typography sx={ { mb: 2 } } variant='body2'>
        { t( 'login.enterEmail' ) }
      </Typography>

      <Box  component='form' onSubmit={ handleSubmit } >
        <TextField
          error={ errors?.email?.error }
          fullWidth 
          helperText={ t(errors?.email?.helperText) }
          label={ t( 'login.email' ) }
          onBlur={ handleBlur('email') }
          onChange={ handleChange('email') }
          required
          size='large'
          sx={ { mb: 2 } }
          type='email'
          value={ data.email }
        />
        <Button
          size='large' sx={ style.sentPass } type='submit'
          variant="contained"
        >
          { t( 'login.sendPassword' ) }
        </Button>
      </Box>

      <Button
        onClick={ handleModal } size='large' sx={ style.back }
        variant='text'
      >
        { t( 'login.backToLogin' ) }
      </Button>
    </Box>
  )
}

export default ForgotPaaword
