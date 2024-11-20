import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

import GoogleLogin from '~/containers/guest-home-page/google-login/GoogleLogin'
import LoginForm from '~/containers/guest-home-page/login-form/LoginForm'
import useForm from '~/hooks/use-form'
import { useLoginMutation } from '~/services/auth-service'
import { useModalContext } from '~/context/modal-context'
import { useAppDispatch } from '~/hooks/use-redux'
import { email, logInPassword } from '~/utils/validations/login'
import loginImg from '~/assets/img/login-dialog/login.svg'
import { login, snackbarVariants } from '~/constants'

import styles from '~/containers/guest-home-page/login-dialog/LoginDialog.styles'
import { useNavigate, useLocation } from 'react-router-dom'
import { errorRoutes } from '~/router/constants/errorRoutes'
import { guestRoutes } from '~/router/constants/guestRoutes'
import { openAlert } from '~/redux/features/snackbarSlice'
import { getErrorKey } from '~/utils/get-error-key'

const LoginDialog = () => {
  const { t } = useTranslation()
  const { closeModal } = useModalContext()
  const dispatch = useAppDispatch()
  const [loginUser] = useLoginMutation()

  const { pathname, state } = useLocation()
  const navigate = useNavigate()

  const { handleSubmit, handleInputChange, handleBlur, data, errors } = useForm(
    {
      onSubmit: async () => {
        try {
          await loginUser(data).unwrap()
          closeModal()
          if (pathname === errorRoutes.authPolicy.path) {
            navigate(state?.prevPage || guestRoutes.home.path)
          }
        } catch (e) {
          dispatch(
            openAlert({
              severity: snackbarVariants.error,
              message: getErrorKey(e.data)
            })
          )
        }
      },
      initialValues: { email: '', password: '', rememberMe: false },
      validations: { email, password: logInPassword }
    }
  )

  return (
    <Box sx={styles.root}>
      <Box sx={styles.imgContainer}>
        <Box alt='login' component='img' src={loginImg} sx={styles.img} />
      </Box>

      <Box sx={styles.formContainer}>
        <Typography sx={styles.title} variant='h2'>
          {t('login.head')}
        </Typography>
        <Box sx={styles.form}>
          <LoginForm
            data={data}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
          <GoogleLogin buttonWidth={styles.form.minWidth} type={login} />
        </Box>
      </Box>
    </Box>
  )
}

export default LoginDialog
