import { useContext, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

import { SnackBarContext } from '~/context/snackbar-context'
import { ModalContext } from '~/context/modal-context'
import useForm from '~/hooks/use-form'

import AppTextField from '~/components/app-text-field/AppTextField'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'
import info from '~/assets/img/guest-home-page/info.svg'
import { AuthService } from '~/services/auth-service'

import { snackbarVariants } from '~/constants'
import { email } from '~/utils/validations/login'
import { style } from '~/containers/guest-home-page/forgot-password/ForgotPassword.styles'

const ForgotPassword = () => {
  const { t } = useTranslation()
  const { setModal, closeModalAfterDelay } = useContext(ModalContext)
  const [loading, setLoading] = useState(false)
  const { setAlert } = useContext(SnackBarContext)

  const backToLogin = () => {
    setModal(<LoginDialog />)
  }

  const sendEmail = async (data) => {
    try {
      setLoading(true)
      await AuthService.forgotPassword(data)
      setModal(<ImgTitleDescription description={ description } img={ info } title={ t('login.passwordReset') } />)
      closeModalAfterDelay()
    } catch (e) {
      setAlert({
        severity: snackbarVariants.error,
        message: `errors.${e.response.data.code}`
      })
    } finally {
      setLoading(false)
    }
  }

  const { handleSubmit, handleChange, handleBlur, errors, data } = useForm({
    onSubmit: async () => sendEmail(data),
    initialValues: { email: '' },
    validations: { email }
  })

  const description = (
    <>
      { t('login.weSentEmail') }
      <Typography component='span' variant='subtitle2'>
        { data.email }
      </Typography>
      { t('login.emailArrive') }
    </>
  )

  return (
    <Box sx={ style.root }>
      <TitleWithDescription
        componentStyles={ style.wrapper }
        description={ t('login.enterEmail') }
        descriptionStyles={ style.description }
        title={ t('login.forgotPassword') }
        titleStyles={ style.title }
      />

      <Box component='form' onSubmit={ handleSubmit }>
        <AppTextField
          autoFocus
          errorMsg={ t(errors.email) }
          fullWidth
          label={ t('common.labels.email') }
          onBlur={ handleBlur('email') }
          onChange={ handleChange('email') }
          required
          size='large'
          sx={ { mb: '5px' } }
          type='email'
          value={ data.email }
        />

        <Button
          size='large' sx={ style.sentPassword } type='submit'
          variant='contained'
        >
          { loading ? 'Loading' : t('login.sendPassword') }
        </Button>
      </Box>

      <Button
        onClick={ backToLogin } size='large' sx={ style.backButton }
        variant='text'
      >
        { t('login.backToLogin') }
      </Button>
    </Box>
  )
}

export default ForgotPassword
