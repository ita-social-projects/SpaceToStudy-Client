import { FC } from 'react'

import Accordions from '~/components/accordion/Accordions'
import Box from '@mui/material/Box'
import useAccordions from '~/hooks/use-accordions'

import { styles } from '~/components/accordion-with-image/AccordionWithImage.styles'
import { AccordionWithImageItem, TypographyVariantEnum } from '~/types'

interface AccordionWithImageProps {
  items: AccordionWithImageItem[]
}

const AccordionWithImage: FC<AccordionWithImageProps> = ({ items }) => {
  const [expandedItem, handleAccordionChange] = useAccordions({
    toggle: false,
    initialState: 0
  })

  return (
    <Box className='section' data-testid='accordion' sx={styles.feature}>
      <Box
        component='img'
        src={items[expandedItem ?? 0].image}
        sx={styles.image}
      />
      <Accordions
        activeIndex={expandedItem}
        descriptionVariant={TypographyVariantEnum.Body2}
        items={items}
        onChange={handleAccordionChange}
        titleVariant={TypographyVariantEnum.H6}
      />
    </Box>
  )
}

export default AccordionWithImage
