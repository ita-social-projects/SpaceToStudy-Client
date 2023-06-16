import { FC } from 'react'

import AccordionWithImage from '~/components/accordion-with-image/AccordionWithImage'
import CarouselWithImage from '~/components/carousel-with-image/CarouselWithImage'
import useBreakpoints from '~/hooks/use-breakpoints'
import { AccordionWithImageItem } from '~/types'

interface FeatureBlockProps {
  items: AccordionWithImageItem[]
}

const FeatureBlock: FC<FeatureBlockProps> = ({ items }) => {
  const { isMobile } = useBreakpoints()

  return isMobile ? (
    <CarouselWithImage items={items} />
  ) : (
    <AccordionWithImage items={items} />
  )
}

export default FeatureBlock
