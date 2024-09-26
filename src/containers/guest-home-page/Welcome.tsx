import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useBreakpoints from '~/hooks/use-breakpoints'
import HashLink from '~/components/hash-link/HashLink'
import AppButton from '~/components/app-button/AppButton'

import { guestRoutes } from '~/router/constants/guestRoutes'
import { styles } from '~/containers/guest-home-page/styles/Welcome.styles.js'
import {
  titles,
  DeviceType
} from '~/containers/guest-home-page/Welcome.constants'
import i18next from 'i18next'

const Welcome = () => {
  const { t } = useTranslation()
  const { isLaptopAndAbove, isTablet, isMobile } = useBreakpoints()

  const image = useMemo(() => {
    const language = i18next.language === 'uk' ? 'uk' : 'default'
    const deviceType: DeviceType = isLaptopAndAbove
      ? 'isLaptopAndAbove'
      : isTablet
        ? 'isTablet'
        : 'isMobile'

    return titles[language]?.[deviceType]
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
