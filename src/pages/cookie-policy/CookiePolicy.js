import { Container, Typography, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { styles } from './cookie-policy.styles'

const CookiePolicy = () => {
  const { t } = useTranslation()

  return (
    <Container data-testid="sectionContainer" sx={ styles.container }>
      <Box sx={ styles.firstItemWrapper }>
        <Typography sx={ styles.firstItemTitleStyle }>
          { t('cookiePolicyPage.cookiePolicy.title') }
        </Typography>

        <Typography sx={ styles.descriptionStyles }>
          { t('cookiePolicyPage.cookiePolicy.description') }
        </Typography>
      </Box>

      <Box sx={ styles.wrapper }>
        <Typography sx={ styles.titleStyles }>
          { t('cookiePolicyPage.whatAreCookies.title') }
        </Typography>

        <Typography sx={ styles.descriptionStyles }>
          { t('cookiePolicyPage.whatAreCookies.description') }
        </Typography>
      </Box>

      <Box sx={ styles.wrapper }>
        <Typography sx={ styles.titleStyles }>
          { t('cookiePolicyPage.howWeUseCookies.title') }
        </Typography>

        <Typography sx={ styles.descriptionStyles }>
          { t('cookiePolicyPage.howWeUseCookies.description') }
        </Typography>
      </Box>

      <Box sx={ styles.wrapper }>
        <Typography sx={ styles.titleStyles }>
          { t('cookiePolicyPage.disablingCookies.title') }
        </Typography>

        <Typography sx={ styles.descriptionStyles }>
          { t('cookiePolicyPage.disablingCookies.description') }
        </Typography>
      </Box>

      <Box sx={ styles.wrapper }>
        <Typography sx={ styles.titleStyles }>
          { t('cookiePolicyPage.theCookiesWeSet.title') }
        </Typography>

        <Typography sx={ styles.subtitleStyles }>
          { t('cookiePolicyPage.theCookiesWeSet.account.title') }
        </Typography>

        <Typography sx={ styles.descriptionStyles }>
          { t('cookiePolicyPage.theCookiesWeSet.account.description') }
        </Typography>
      </Box>

      <Box sx={ styles.wrapper }>
        <Typography sx={ styles.subtitleStyles }>
          { t('cookiePolicyPage.theCookiesWeSet.login.title') }
        </Typography>

        <Typography sx={ styles.descriptionStyles }>
          { t('cookiePolicyPage.theCookiesWeSet.login.description') }
        </Typography>
      </Box>

      <Box sx={ styles.wrapper }>
        <Typography sx={ styles.subtitleStyles }>
          { t('cookiePolicyPage.theCookiesWeSet.site.title') }
        </Typography>

        <Typography sx={ styles.descriptionStyles }>
          { t('cookiePolicyPage.theCookiesWeSet.site.description') }
        </Typography>
      </Box>

      <Box sx={ styles.wrapper }>
        <Typography sx={ styles.titleStyles }>
          { t('cookiePolicyPage.thirdPartyCookies.title') }
        </Typography>

        <Typography sx={ styles.descriptionStyles }>
          { t('cookiePolicyPage.thirdPartyCookies.description') }
        </Typography>

        <Typography sx={ styles.subtitleStyles }>
          { t('cookiePolicyPage.thirdPartyCookies.subtitle') }
        </Typography>
      </Box>

      <Box sx={ styles.wrapper }>
        <Typography sx={ styles.titleStyles }>
          { t('cookiePolicyPage.moreInformation.title') }
        </Typography>

        <Typography sx={ styles.subtitleStyles }>
          { t('cookiePolicyPage.moreInformation.subtitle') }  
        </Typography>
      </Box>
    </Container>
  )
}

export default CookiePolicy
