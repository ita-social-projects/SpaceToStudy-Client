import { useContext } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { ModalContext } from '~/context/modal-context'
import useForm from '~/hooks/use-form'

import AppTextField from '~/components/app-text-field/AppTextField'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'
import info from '~/assets/img/guest-home-page/info.svg'

import { email } from '~/constants/validation/login'
import { style } from '~/containers/guest-home-page/forgot-password/forgot-password.style'

const ForgotPassword = () => {
  const { t } = useTranslation()
  const { setModal, closeModal } = useContext(ModalContext)

  const backToLogin = () => {
    setModal(<LoginDialog />)
  }

  const { handleSubmit, handleChange, handleBlur, errors, data } = useForm({
    onSubmit: () =>{
      setModal(
        <ImgTitleDescription
          description={ description }
          img={ info }
          title={ t('login.passwordReset') }
        />)
      setTimeout(() => closeModal(), 5000)
    },
    initialValues: { email: '' },
    validations: { email }
  })

  const description = (
    <>
      { t('login.weSentEmail') }
      <Typography component="span"  variant='subtitle2'>
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

      <Box component="form" onSubmit={ handleSubmit }>
        <AppTextField
          autoFocus
          errorMsg={ t(errors.email) }
          fullWidth
          label={ t('common.labels.email') }
          onBlur={ handleBlur('email') }
          onChange={ handleChange('email') }
          required
          size="large"
          sx={ { mb: '5px' } }
          type="email"
          value={ data.email }
        />

        <Button
          size="large" sx={ style.sentPassword } type="submit"
          variant="contained"
        >
          { t('login.sendPassword') }
        </Button>
      </Box>

      <Button
        onClick={ backToLogin } size="large" sx={ style.backButton }
        variant="text"
      >
        { t('login.backToLogin') }
      </Button>
    </Box>
  )
}

export default ForgotPassword
