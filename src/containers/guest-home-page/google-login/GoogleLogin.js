import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Typography, Button } from '@mui/material'
import HashLink from '~/components/hash-link/HashLink'

import { ModalContext } from '~/context/modal-context'
import { guestRoutes } from '~/router/constants/guestRoutes'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'

import { styles } from '~/containers/guest-home-page/google-login/GoogleLogin.styles'
import google from '~/assets/img/login-dialog/google.svg'

const GoogleLogin = ({ type }) => {
  const { t } = useTranslation()
  const { whatCanYouDo } = guestRoutes.navBar
  const { openModal, closeModal } = useContext(ModalContext)

  const openLoginDialog = () => {
    closeModal()
    setTimeout(() => openModal({ component: <LoginDialog /> }), 0)
  }

  return (
    <Box>
      <Box sx={ styles.linesBox }>
        <Typography sx={ styles.continue } variant='body2'>
          { t(`${type}.continue`) }
        </Typography>
      </Box>

      <Button size='large' sx={ styles.google } variant='outlined'>
        <Box
          alt='google icon' component='img' src={ google }
          sx={ { pr: 1 } }
        />
        { t(`${type}.googleButton`) }
      </Button>

      <Box sx={ styles.haveAccount }>
        <Typography sx={ { pr: 1 } } variant='body2'>
          { t(`${type}.haveAccount`) }
        </Typography>

        { type === 'signup' ? (
          <Typography onClick={ openLoginDialog } sx={ styles.underlineText } variant='body2'>
            { t('signup.joinUs') }
          </Typography>
        ) : (
          <Typography
            component={ HashLink }
            onClick={ closeModal }
            sx={ styles.underlineText }
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
