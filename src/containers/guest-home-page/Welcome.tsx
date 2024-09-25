import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useBreakpoints from '~/hooks/use-breakpoints'
import HashLink from '~/components/hash-link/HashLink'
import AppButton from '~/components/app-button/AppButton'

import titleMd from '~/assets/img/guest-home-page/titleMd.svg'
import titleSm from '~/assets/img/guest-home-page/titleSm.svg'
import titleXs from '~/assets/img/guest-home-page/titleXs.svg'
import { guestRoutes } from '~/router/constants/guestRoutes'
import { styles } from '~/containers/guest-home-page/styles/Welcome.styles.js'
import i18next from 'i18next'

const Welcome = () => {
  const { t } = useTranslation()
  const { isLaptopAndAbove, isTablet, isMobile } = useBreakpoints()

  const image = useMemo(() => {
    if (i18next.language == 'en') {
      if (isLaptopAndAbove) return titleMd
      if (isTablet) return titleSm
      if (isMobile) return titleXs
    } else if (i18next.language == 'uk') {
      return titleXs
    }
  }, [isLaptopAndAbove, isTablet, isMobile, i18next.language])

  return (
    <Box
      className='section'
      id={guestRoutes.welcome.route}
      sx={styles.container}
    >
      <Box alt='Title' component='img' src={image} sx={styles.title} />
      <Typography sx={styles.subtitle}>
        {t('guestHomePage.welcomeBlock.description')}
      </Typography>
      <AppButton
        component={HashLink}
        sx={styles.getStartBtn}
        to={guestRoutes.navBar.whatCanYouDo.path}
      >
        {t('guestHomePage.welcomeBlock.getStarted')}
      </AppButton>
    </Box>
  )
}

export default Welcome
