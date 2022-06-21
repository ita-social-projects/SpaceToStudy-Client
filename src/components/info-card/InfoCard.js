import { Box, Button } from '@mui/material'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { styles } from '~/components/info-card/info-card.styles'

//TODO add possibility for button to open pop-up.

const titleVariant = {
  md: 'h4',
  xs: 'h5'
}
const descriptionVariant = {
  md: 'body1',
  xs: 'body2'
}

const InfoCard = ({ img, title, description, actionLabel, cardWidth }) => {
  return (
    <Box sx={ { ...styles.card, maxWidth: cardWidth } }>
      <Box
        alt={ title }
        component='img' src={ img }
        sx={ styles.cardImg }
      ></Box>

      <TitleWithDescription
        description={ description }
        descriptionVariant={ descriptionVariant }
        title={ title }
        titleVariant={ titleVariant }
      />

      <Button variant='contained'>
        { actionLabel }
      </Button>
    </Box>
  )
}

export default InfoCard
