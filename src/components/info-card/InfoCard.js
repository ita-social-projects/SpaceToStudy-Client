import { Box, Button, Typography } from '@mui/material'

import { cardStyles as style } from '~/components/info-card/info-card.styles'

//TODO add possibility for button to open pop-up.

const InfoCard = ({ img, title, description, btnText, link }) => {
  return (
    <Box sx={ style.card }>
      <Box
        alt='Learn from experts'
        component='img' data-testid='img' src={ img }
        sx={ style.cardImg }
      ></Box>
      <Typography sx={ style.cardTitle }>
        { title }
      </Typography>
      <Typography sx={ style.cardDescription }>
        { description }
      </Typography>
      <Button
        variant='contained'
      >
        { btnText }
      </Button>
    </Box>
  )
}

export default InfoCard
