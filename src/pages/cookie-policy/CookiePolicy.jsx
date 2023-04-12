import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

import { cookieItemsData } from './cookie-policy.constants'

import { styles } from './CookiePolicy.styles'

const CookiePolicy = () => {
  const { t } = useTranslation()

  const cookieItems = cookieItemsData.map((item, index) => {
    return (
      <Box key={index} sx={styles.wrapper}>
        <Typography sx={styles.title}>{t(item.title)}</Typography>

        <Typography sx={item.subtitle && styles.subtitle}>
          {t(item.subtitle)}
        </Typography>

        <Typography sx={styles.description}>{t(item.description)}</Typography>
      </Box>
    )
  })

  return (
    <Container data-testid='sectionContainer' sx={styles.container}>
      <Box sx={styles.firstItemWrapper}>
        <Typography sx={styles.firstItemTitle}>
          {t('cookiePolicyPage.cookiePolicy.title')}
        </Typography>

        <Typography sx={styles.description}>
          {t('cookiePolicyPage.cookiePolicy.description')}
        </Typography>
      </Box>
      {cookieItems}
    </Container>
  )
}

export default CookiePolicy
