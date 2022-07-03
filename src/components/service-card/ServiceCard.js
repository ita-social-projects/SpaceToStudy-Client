import { Link } from 'react-router-dom'
import { Box, Typography, Button } from '@mui/material'

import { serviceCardHoverShadow, serviceCardShadow } from '~/styles/app-theme/custom-shadows'

const styles = {
  card: {
    display: 'flex',
    justifyContent: 'flex-start',
    maxWidth: '360px',
    p: '25px 32px',
    backgroundColor: 'basic.white',
    boxShadow: serviceCardShadow,
    borderRadius: '6px',
    '&:hover': {
      boxShadow: serviceCardHoverShadow
    }
  }
}

const ServiceCard = ({ img, title, count, link }) => {
  return (
    <Button component={ Link } sx={ styles.card } to={ link }>
      <Box
        alt='Category image' component='img' src={ img }
        sx={ { mr: '24px' } }
      />
      <Box sx={ { textAlign: 'start' } }>
        <Typography variant='h6'>
          { title }
        </Typography>
        <Typography sx={ { color: 'primary.500' } } variant='body2'>
          { `${count} mentors` }
        </Typography>
      </Box>
    </Button>
  )
}

export default ServiceCard
