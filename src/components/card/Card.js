import { Box, Button, Typography } from '@mui/material'

import { cardStyles as style } from '~/components/card/card.styles'
import { Link } from 'react-router-dom'

//TODO add possibility for button to redirect user to the specified url.

const Card = ({ img, title, description, btnText, link }) => {
  return (
    <Box sx={ style.card }>
      <Box
        alt='Learn from experts' component='img' src={ img }
        sx={ style.cardImg }
      ></Box>
      <Typography sx={ style.cardTitle }>
        { title }
      </Typography>
      <Typography sx={ style.cardDescription }>
        { description }
      </Typography>
      <Button component={ Link } to={ link } variant='contained'>
        { btnText }
      </Button>
    </Box>
  )
}

export default Card
