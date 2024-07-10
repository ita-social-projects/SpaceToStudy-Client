import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'
import HashLink from '~/components/hash-link/HashLink'

import { useModalContext } from '~/context/modal-context'
import { guestRoutes } from '~/router/constants/guestRoutes'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'
import GoogleButton from '~/containers/guest-home-page/google-button/GoogleButton'

import { styles } from '~/containers/guest-home-page/google-login/GoogleLogin.styles'

const GoogleLogin = ({ type, buttonWidth, role }) => {
  const { t, i18n } = useTranslation()
  const { whatCanYouDo } = guestRoutes.navBar
  const { openModal, closeModal } = useModalContext()

  const openLoginDialog = () => {
    closeModal()
    setTimeout(() => openModal({ component: <LoginDialog /> }), 0)
  }

  const currentLanguage = i18n.language

  return (
    <Box sx={styles.googleForm}>
      <Box sx={styles.linesBox}>
        <Typography sx={styles.continue} variant='body2'>
          {t(`${type}.continue`)}
        </Typography>
      </Box>

      <GoogleButton
        buttonWidth={buttonWidth}
        role={role}
        route={whatCanYouDo.path}
        type={type}
      />
      <Box
        sx={{
          ...styles.haveAccount,
          ...(currentLanguage === 'ua' && type !== 'signup'
            ? styles.haveAccountUa
            : {})
        }}
      >
        <Typography sx={{ pr: 1 }} variant='body2'>
          {t(`${type}.haveAccount`)}
        </Typography>

        {type === 'signup' ? (
          <Typography
            onClick={openLoginDialog}
            sx={styles.underlineText}
            variant='body2'
          >
            {t('signup.joinUs')}
          </Typography>
        ) : (
          <Typography
            component={HashLink}
            onClick={closeModal}
            sx={{
              ...styles.underlineText,
              ...(currentLanguage === 'ua' ? styles.underlineTextUa : {})
            }}
            to={whatCanYouDo.path}
            variant='body2'
          >
            {t('login.joinUs')}
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default GoogleLogin
