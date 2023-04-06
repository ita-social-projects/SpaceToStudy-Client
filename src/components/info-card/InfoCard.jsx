import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { styles } from '~/components/info-card/InfoCard.styles'

const InfoCard = ({
  img,
  title,
  description,
  actionLabel,
  cardWidth,
  action
}) => {
  return (
    <Box sx={{ ...styles.card, maxWidth: cardWidth }}>
      <Box alt={title} component='img' src={img} sx={styles.cardImg}></Box>

      <TitleWithDescription
        description={description}
        descriptionStyles={{ typography: { md: 'body1', xs: 'body2' } }}
        title={title}
        titleStyles={{ typography: { md: 'h4', xs: 'h5' } }}
      />

      <Button onClick={action} variant='contained'>
        {actionLabel}
      </Button>
    </Box>
  )
}

export default InfoCard
