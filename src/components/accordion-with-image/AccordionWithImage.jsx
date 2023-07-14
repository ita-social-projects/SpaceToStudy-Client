import { useState } from 'react'

import Box from '@mui/material/Box'
import Accordions from '~/components/accordion/Accordions'

import { styles } from '~/components/accordion-with-image/AccordionWithImage.styles'

const AccordionWithImage = ({ items }) => {
  const [activeItemId, setActiveItemId] = useState(0)

  return (
    <Box className='section' data-testid='accordion' sx={styles.feature}>
      <Box component='img' src={items[activeItemId].image} sx={styles.image} />
      <Accordions
        activeIndex={activeItemId}
        descriptionVariant={'body2'}
        items={items}
        onChange={(id) => setActiveItemId(id)}
        titleVariant={'h6'}
      />
    </Box>
  )
}

export default AccordionWithImage
