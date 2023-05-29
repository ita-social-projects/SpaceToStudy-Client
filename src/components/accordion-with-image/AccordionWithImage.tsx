import { FC, useState } from 'react'

import Accordions from '~/components/accordion/Accordions'
import Box from '@mui/material/Box'

import { styles } from '~/components/accordion-with-image/AccordionWithImage.styles'
import { AccordionWithImageItem, VariantEnum } from '~/types'

interface AccordionWithImageProps {
  items: AccordionWithImageItem[]
}

const AccordionWithImage: FC<AccordionWithImageProps> = ({ items }) => {
  const [activeItemId, setActiveItemId] = useState(0)

  return (
    <Box className='section' data-testid='accordion' sx={styles.feature}>
      <Box component='img' src={items[activeItemId].image} sx={styles.image} />
      <Accordions
        activeIndex={activeItemId}
        descriptionVariant={VariantEnum.Body2}
        items={items}
        onChange={(id) => setActiveItemId(id)}
        titleVariant={VariantEnum.H6}
      />
    </Box>
  )
}

export default AccordionWithImage
