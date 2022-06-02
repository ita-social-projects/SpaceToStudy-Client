import Accordions from '../accordion/Accordions.js'
import { Box } from '@mui/system'
import { useState } from 'react'
import Carousel from '../carousel/Carousel'

const style = {
  feature: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    px: '24px',
    overflow: 'auto'
  },
  image: {
    maxHeight: '470px',
    maxWidth: '744px',
    overflow: 'auto',
    mr: '24px',
    display: { xs: 'none', sm: 'inline' }
  }
}

const AccordionWithImage = ({ items }) => {
  const [activeItemId, setActiveItemId] = useState(0)

  return (
    <Box sx={ style.feature }>
      <Box component="img" src={ items[activeItemId].image } sx={ style.image } />
      <Accordions
        activeIndex={ activeItemId }
        items={ items }
        onChange={ (id) => setActiveItemId(id) }
        styles={ { maxWidth: { md: '360px', sm: '229px' }, display: { xs: 'none', sm: 'inline' } } }
      />
      <Carousel items={ items } />
    </Box>
  )
}

export default AccordionWithImage
