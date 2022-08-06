import { Container } from '@mui/material'
import { useTranslation } from 'react-i18next'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { cookieItemsData } from './cookie-policy.constants'

import { styles } from './cookie-policy.styles'

const CookiePolicy = () => {
  const { t } = useTranslation()

  const cookieItems = cookieItemsData.map((item) => {
    return (
      <TitleWithDescription
        componentStyles={ styles.wrapper }
        description={ t(item.description) }
        descriptionStyles={ styles.descriptionStyles }
        key={ item.id }
        subtitle={ t(item.subtitle) }
        subtitleStyles={ styles.subtitleStyles }
        title={ t(item.title) }
        titleStyles={ styles.titleStyles }
      />
    )
  })

  return (
    <Container data-testid="sectionContainer" sx={ styles.container }>
      <TitleWithDescription
        componentStyles={ styles.firstItemWrapper }
        description={ t('cookiePolicyPage.cookiePolicy.description') }
        descriptionStyles={ styles.descriptionStyles }
        title={ t('cookiePolicyPage.cookiePolicy.title') }
        titleStyles={ styles.firstItemTitleStyle }
      />
      { cookieItems }
    </Container>
  )
}

export default CookiePolicy
