import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { Box, Container } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { styles } from './cookie-policy.styles'
import {
  cookieItemsData,
  cookieItemsTitleVariant,
  descriptionVariant,
  sectionTitleVariant,
  textWithDotVariant
} from './cookie-policy.constants'

const CookiePolicy = () => {
  const { t } = useTranslation()

  const itemsData = cookieItemsData.map((item) => {
    return (
      <Box data-testid="cookieItems" key={item.id} sx={styles.sectionTitle}>
        <Box sx={item.id !== 1 ? styles.itemsContainer : null}>
          <TitleWithDescription
            description={t(item.description)}
            descriptionVariant={descriptionVariant}
            style={item.styleProp}
            textWithDot={t(item.textWithDot)}
            textWithDotVariant={textWithDotVariant}
            title={t(item.title)}
            titleVariant={item.id === 1 ? sectionTitleVariant : cookieItemsTitleVariant}
          />
        </Box>
      </Box>
    )
  })

  return (
    <Box data-testid="sectionBox">
      <Container sx={styles.container}>{itemsData}</Container>
    </Box>
  )
}

export default CookiePolicy
