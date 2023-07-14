import { useState } from 'react'

import Box from '@mui/material/Box'
import Accordions from '~/components/accordion/Accordions'

import { styles } from '~/components/accordion-with-image/AccordionWithImage.styles'
import { TypographyVariantEnum } from '~/types'

const AccordionWithImage = ({ items }) => {
  const [activeItemId, setActiveItemId] = useState(0)

  return (
    <Box className='section' data-testid='accordion' sx={styles.feature}>
      <Box component='img' src={items[activeItemId].image} sx={styles.image} />
      <Accordions
        activeIndex={activeItemId}
        descriptionVariant={TypographyVariantEnum.Body2}
        items={items}
        onChange={(id) => setActiveItemId(id)}
        titleVariant={TypographyVariantEnum.H6}
      />
    </Box>
  )
}

export default AccordionWithImage
