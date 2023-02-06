import { useState } from 'react'

import Accordions from '~/components/accordion/Accordions'
import Box from '@mui/material/Box'

import { styles } from '~/components/accordion-with-image/AccordionWithImage.styles'

const AccordionWithImage = ({ items }) => {
  const [activeItemId, setActiveItemId] = useState(0)

  return (
    <Box className='section' data-testid='accordion' sx={ styles.feature }>
      <Box component='img' src={ items[activeItemId].image } sx={ styles.image } />
      <Accordions
        activeIndex={ activeItemId }
        items={ items }
        onChange={ (id) => setActiveItemId(id) }
        style={ styles.accordions }
      />
    </Box>
  )
}

export default AccordionWithImage
