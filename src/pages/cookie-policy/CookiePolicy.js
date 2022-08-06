import { Container } from '@mui/material'
import { useTranslation } from 'react-i18next'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import { styles } from './cookie-policy.styles'

const CookiePolicy = () => {
  const { t } = useTranslation()

  return (
    <Container data-testid="sectionContainer" sx={ styles.container }>
      <TitleWithDescription
        componentStyles={ styles.firstItemWrapper }
        description={ t('cookiePolicyPage.cookiePolicy.description') }
        descriptionStyles={ styles.descriptionStyles }
        title={ t('cookiePolicyPage.cookiePolicy.title') }
        titleStyles={ styles.firstItemTitleStyle }
      />
      <TitleWithDescription
        componentStyles={ styles.wrapper }
        description={ t('cookiePolicyPage.whatAreCookies.description') }
        descriptionStyles={ styles.descriptionStyles }
        title={ t('cookiePolicyPage.whatAreCookies.title') }
        titleStyles={ styles.titleStyles }
      />
      <TitleWithDescription
        componentStyles={ styles.wrapper }
        description={ t('cookiePolicyPage.howWeUseCookies.description') }
        descriptionStyles={ styles.descriptionStyles }
        title={ t('cookiePolicyPage.howWeUseCookies.title') }
        titleStyles={ styles.titleStyles }
      />
      <TitleWithDescription
        componentStyles={ styles.wrapper }
        description={ t('cookiePolicyPage.disablingCookies.description') }
        descriptionStyles={ styles.descriptionStyles }
        title={ t('cookiePolicyPage.disablingCookies.title') }
        titleStyles={ styles.titleStyles }
      />
      <TitleWithDescription
        componentStyles={ styles.wrapper }
        description={ t('cookiePolicyPage.theCookiesWeSet.account.description') }
        descriptionStyles={ styles.descriptionStyles }
        subtitle={ t('cookiePolicyPage.theCookiesWeSet.account.title') }
        subtitleStyles={ styles.subtitleStyles }
        title={ t('cookiePolicyPage.theCookiesWeSet.title') }
        titleStyles={ styles.titleStyles }
      />
      <TitleWithDescription
        componentStyles={ styles.wrapper }
        description={ t('cookiePolicyPage.theCookiesWeSet.login.description') }
        descriptionStyles={ styles.descriptionStyles }
        subtitle={ t('cookiePolicyPage.theCookiesWeSet.login.title') }
        subtitleStyles={ styles.subtitleStyles }
      />
      <TitleWithDescription
        componentStyles={ styles.wrapper }
        description={ t('cookiePolicyPage.theCookiesWeSet.site.description') }
        descriptionStyles={ styles.descriptionStyles }
        subtitle={ t('cookiePolicyPage.theCookiesWeSet.site.title') }
        subtitleStyles={ styles.subtitleStyles }
      />
      <TitleWithDescription
        componentStyles={ styles.wrapper }
        description={ t('cookiePolicyPage.thirdPartyCookies.description') }
        descriptionStyles={ styles.descriptionStyles }
        subtitle={ t('cookiePolicyPage.thirdPartyCookies.titleWithDot') }
        subtitleStyles={ styles.subtitleStyles }
        title={ t('cookiePolicyPage.thirdPartyCookies.title') }
        titleStyles={ styles.titleStyles }
      />
      <TitleWithDescription
        componentStyles={ styles.wrapper }
        subtitle={ t('cookiePolicyPage.moreInformation.titleWithDot') }
        subtitleStyles={ styles.subtitleStyles }
        title={ t('cookiePolicyPage.moreInformation.title') }
        titleStyles={ styles.titleStyles }
      />
    </Container>
  )
}

export default CookiePolicy
