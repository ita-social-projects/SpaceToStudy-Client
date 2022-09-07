import { useState } from 'react'

import Accordions from '../accordion/Accordions.js'
import Box from '@mui/material/Box'

import { style } from '~/components/accordion-with-image/AccordionWithImage.styles'

const AccordionWithImage = ({ items }) => {
  const [activeItemId, setActiveItemId] = useState(0)

  return (
    <Box className='section' data-testid='accordion' sx={ style.feature }>
      <Box component='img' src={ items[activeItemId].image } sx={ style.image } />
      <Accordions
        activeIndex={ activeItemId }
        items={ items }
        onChange={ (id) => setActiveItemId(id) }
        style={ style.accordions }
      />
    </Box>
  )
}

export default AccordionWithImage
