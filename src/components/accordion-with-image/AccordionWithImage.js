import Accordions from '../accordion/Accordions.js'
import { Box } from '@mui/system'
import { useState } from 'react'

const style = {
  feature: {
    px: '24px',
    overflow: 'auto'
  },
  image: {
    maxHeight: '470px',
    overflow: 'auto',
    mr: '24px'
  }
}

const AccordionWithImage = ({ items }) => {
  const [activeItemId, setActiveItemId] = useState(0)

  return (
    <Box className='section' data-testid="accordion" sx={ style.feature }>
      <Box component="img" src={ items[activeItemId].image } sx={ style.image } />
      <Accordions
        activeIndex={ activeItemId }
        items={ items }
        onChange={ (id) => setActiveItemId(id) }
        styles={ { maxWidth: { md: '360px', sm: '229px' } } }
      />
    </Box>
  )
}

export default AccordionWithImage
