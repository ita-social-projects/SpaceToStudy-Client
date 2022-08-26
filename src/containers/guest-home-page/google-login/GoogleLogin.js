import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'

import { ModalContext } from '~/context/modal-context'
import { routes } from '~/constants/routes'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'

import { style } from '~/containers/guest-home-page/google-login/google-login.style'
import google from '~/assets/img/login-dialog/google.svg'

const GoogleLogin = ({ type }) => {
  const { t } = useTranslation()
  const { whatCanYouDo } = routes.guestNavBar
  const { setModal, closeModal } = useContext(ModalContext)

  const openLoginDialog = () => {
    closeModal()
    setTimeout(() => setModal(<LoginDialog />), 0)
  }

  return (
    <Box>
      <Box sx={ style.linesBox }>
        <Typography sx={ style.continue } variant='body2'>
          { t(`${type}.continue`) }
        </Typography>
      </Box>

      <Button size='large' sx={ style.google } variant='outlined'>
        <Box
          alt='google icon' component='img' src={ google }
          sx={ { pr: 1 } }
        />
        { t(`${type}.googleButton`) }
      </Button>

      <Box sx={ style.haveAccount }>
        <Typography sx={ { pr: 1 } } variant='body2'>
          { t(`${type}.haveAccount`) }
        </Typography>

        { type === 'signup' ? (
          <Typography onClick={ openLoginDialog } sx={ style.underlineText } variant='body2'>
            { t('signup.joinUs') }
          </Typography>
        ) : (
          <Typography
            component={ Link }
            onClick={ closeModal }
            sx={ style.underlineText }
            to={ whatCanYouDo.route }
            variant='body2'
          >
            { t('login.joinUs') }
          </Typography>
        ) }
      </Box>
    </Box>
  )
}

export default GoogleLogin
