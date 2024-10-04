import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useBreakpoints from '~/hooks/use-breakpoints'
import HashLink from '~/components/hash-link/HashLink'
import AppButton from '~/components/app-button/AppButton'

import titleMd from '~/assets/img/guest-home-page/titleMd.svg'
import titleSm from '~/assets/img/guest-home-page/titleSm.svg'
import titleXs from '~/assets/img/guest-home-page/titleXs.svg'
import titleMdUk from '~/assets/img/guest-home-page/titleMdUk.svg'
import titleSmUk from '~/assets/img/guest-home-page/titleSmUk.svg'
import titleXsUk from '~/assets/img/guest-home-page/titleXsUk.svg'
import { guestRoutes } from '~/router/constants/guestRoutes'
import { styles } from '~/containers/guest-home-page/styles/Welcome.styles.js'
import i18next from 'i18next'

const Welcome = () => {
  const { t } = useTranslation()
  const { isLaptopAndAbove, isTablet, isMobile } = useBreakpoints()

  const getImage = () => {
    if (i18next.language == 'uk') {
      if (isLaptopAndAbove) return titleMdUk
      if (isTablet) return titleSmUk
      if (isMobile) return titleXsUk
    } else {
      if (isLaptopAndAbove) return titleMd
      if (isTablet) return titleSm
      if (isMobile) return titleXs
    }
  }

  return (
    <Box
      className='section'
      id={guestRoutes.welcome.route}
      sx={styles.container}
    >
      <Box alt='Title' component='img' src={getImage()} sx={styles.title} />
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
