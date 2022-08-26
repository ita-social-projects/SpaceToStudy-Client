import { useContext, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import GoogleLogin from '~/containers/guest-home-page/google-login/GoogleLogin'
import LoginForm from '~/containers/guest-home-page/login-form/LoginForm'
import useForm from '~/hooks/use-form'
import useConfirm from '~/hooks/use-confirm'
import { ModalContext } from '~/context/modal-context'
import { email, password } from '~/utils/validations/login'
import loginImg from '~/assets/img/login-dialog/login.png'
import { login } from '~/containers/guest-home-page/constants'
import { loginUser } from '~/redux/reducer'

import style from '~/containers/guest-home-page/login-dialog/login-dialog.style'
import { SnackBarContext } from '~/context/snackbar-context'

const LoginDialog = () => {
  const { t } = useTranslation()
  const { setNeedConfirmation } = useConfirm()
  const { closeModal } = useContext(ModalContext)
  const { setShowError } = useContext(SnackBarContext)
  const dispatch = useDispatch()

  const { handleSubmit, handleChange, handleBlur, data, isDirty, errors } = useForm({
    onSubmit: async () => {
      try {
        await dispatch(loginUser(data)).unwrap()
        closeModal()
      } catch (e) {
        setShowError(true)
      }
    },
    initialValues: { email: '', password: '' },
    validations: { email, password }
  })

  useEffect(() => {
    setNeedConfirmation(isDirty)
  }, [isDirty, setNeedConfirmation])

  return (
    <Box sx={ style.root }>
      <Box sx={ style.img }>
        <Box
          alt='login' component='img' src={ loginImg }
          sx={ style.img }
        />
      </Box>

      <Box sx={ style.form }>
        <Typography sx={ style.h2 } variant='h2'>
          { t('login.head') }
        </Typography>

        <LoginForm
          data={ data }
          errors={ errors }
          handleBlur={ handleBlur }
          handleChange={ handleChange }
          handleSubmit={ handleSubmit }
        />

        <GoogleLogin type={ login } />
      </Box>
    </Box>
  )
}

export default LoginDialog
