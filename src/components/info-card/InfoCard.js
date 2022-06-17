import { Box, Button, Typography } from '@mui/material'

import { styles } from '~/components/info-card/info-card.styles'
import { useTranslation } from 'react-i18next'

//TODO add possibility for button to open pop-up.

const InfoCard = ({ img, title, description, actionLabel, cardWidth }) => {
  const { t } = useTranslation()

  return (
    <Box sx={ { ...styles.card, maxWidth: cardWidth } }>
      <Box
        alt={ t(title) }
        component='img' data-testid='infoCardImg' src={ img }
        sx={ styles.cardImg }
      ></Box>
      <Typography sx={ styles.cardTitle }>
        { t(title) }
      </Typography>
      <Typography sx={ styles.cardDescription }>
        { t(description) }
      </Typography>
      <Button
        variant='contained'
      >
        { t(actionLabel) }
      </Button>
    </Box>
  )
}

export default InfoCard
