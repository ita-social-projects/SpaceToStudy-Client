import DoneIcon from '@mui/icons-material/Done'
import { Box, Typography } from '@mui/material'
import Link from '@mui/material/Link'
import { FC, useState } from 'react'
import { createPortal } from 'react-dom'
import { Trans, useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import AppButton from '~/components/app-button/AppButton'
import HashLink from '~/components/hash-link/HashLink'
import { styles } from '~/containers/cookie-consent-banner/CookieConsentBanner.styles'
import { guestRoutes } from '~/router/constants/guestRoutes'
import {
  getFromLocalStorage,
  setToLocalStorage
} from '~/services/local-storage-service'

const CookieConsentBanner: FC = () => {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const [cookieConsent, setCookieConsent] = useState<boolean>(() => {
    return getFromLocalStorage('cookieConsent') || false
  })

  const handleButtonClick = () => {
    setCookieConsent(true)
    setToLocalStorage('cookieConsent', true)
  }

  if (cookieConsent || pathname.slice(1) === guestRoutes.privacyPolicy.path) {
    return null
  }

  return createPortal(
    <Box sx={styles.root}>
      <Typography sx={styles.notice}>
        <Trans
          components={[
            <Link
              component={HashLink}
              key={guestRoutes.cookiePolicy.path}
              sx={styles.link}
              target='_blank'
              to={guestRoutes.cookiePolicy.path}
            />,
            <Link
              component={HashLink}
              key={guestRoutes.privacyPolicy.path}
              sx={styles.link}
              target='_blank'
              to={guestRoutes.privacyPolicy.path}
            />
          ]}
          i18nKey='cookieConsentBanner.notice'
        />
      </Typography>
      <AppButton
        onClick={handleButtonClick}
        size='extraLarge'
        sx={styles.button}
        variant='text'
      >
        {t('cookieConsentBanner.acceptButton')}
        <DoneIcon />
      </AppButton>
    </Box>,
    document.body
  )
}

export default CookieConsentBanner
