import { Link } from 'react-router-dom'
import { Box, Button } from '@mui/material'

import { serviceCardHoverShadow, serviceCardShadow } from '~/styles/app-theme/custom-shadows'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

const sx = {
  margin: '0px',
  mb: '0px',
  textAlign: 'start'
}

const titleStyles = {
  m: '0',
  typography: { xs: 'h6' }
}

const descriptionStyles = {
  typography: { xs: 'body2' },
  color: 'primary.500'
}

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
      <TitleWithDescription
        description={ `${count} mentors` } descriptionStyles={ descriptionStyles } sx={ sx }
        title={ title } titleStyles={ titleStyles }
      />
    </Button>
  )
}

export default ServiceCard

