import AccordionWithImage from '~/components/accordion-with-image/AccordionWithImage'
import CarouselWithImage from '~/components/carousel-with-image/CarouselWithImage'
import useBreakpoints from '~/hooks/use-breakpoints'

const FeatureBlock = ({ items }) => {
  const { isMobile } = useBreakpoints()

  return isMobile ? (
    <CarouselWithImage items={items} />
  ) : (
    <AccordionWithImage items={items} />
  )
}

export default FeatureBlock
