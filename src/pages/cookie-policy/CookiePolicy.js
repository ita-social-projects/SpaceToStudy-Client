import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { Box, Container } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { styles } from './cookie-policy.styles'
import { cookieItemsData } from './cookie-policy.constants'

const CookiePolicy = () => {
  const { t } = useTranslation()

  const itemsData = cookieItemsData.map((item) => {
    return (
      <Box data-testid="cookieItems" key={ item.id } sx={ styles.sectionTitle }>
        <Box sx={ item.id !== 1 ? styles.itemsContainer : null }>
          <TitleWithDescription
            componentStyles={ item.componentStyles }
            description={ t(item.description) }
            descriptionStyles={ item.descriptionStyles }
            title={ t(item.title) }
            titleStyles={ item.titleStyles }
          />
        </Box>
      </Box>
    )
  })

  return (
    <Container data-testid="sectionContainer" sx={ styles.container }>
      { itemsData }
    </Container>
  )
}

export default CookiePolicy
