import { useContext, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import GoogleLogin from '~/containers/guest-home-page/google-login/GoogleLogin'
import LoginForm from '~/containers/guest-home-page/login-form/LoginForm'
import useForm from '~/hooks/use-form'
import useConfirm from '~/hooks/use-confirm'
import { ModalContext } from '~/context/modal-context'
import { SnackBarContext } from '~/context/snackbar-context'
import { email, password } from '~/utils/validations/login'
import loginImg from '~/assets/img/login-dialog/login.png'
import { login } from '~/containers/guest-home-page/constants'
import { loginUser } from '~/redux/reducer'

import style from '~/containers/guest-home-page/login-dialog/LoginDialog.style'
import { snackbarVariants } from '~/constants'

const LoginDialog = () => {
  const { t } = useTranslation()
  const { setNeedConfirmation } = useConfirm()
  const { closeModal } = useContext(ModalContext)
  const { setAlert } = useContext(SnackBarContext)
  const dispatch = useDispatch()

  const { handleSubmit, handleChange, handleBlur, data, isDirty, errors } = useForm({
    onSubmit: async () => {
      try {
        await dispatch(loginUser(data)).unwrap()
        closeModal()
      } catch (e) {
        setAlert({
          severity: snackbarVariants.error,
          message: `errors.${e}`
        })
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
      <Box sx={ style.imgContainer }>
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
