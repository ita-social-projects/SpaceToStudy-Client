import AccordionWithImage from '~/components/accordion-with-image/AccordionWithImage'
import CarouselWithImage from '~/components/carousel-with-image/CarouselWithImage'
import useBreakpoints from '~/hooks/use-breakpoints'

const FeatureBlock = ({ items }) => {
  const size = useBreakpoints()

  return size === 'mobile' ? <CarouselWithImage items={ items } /> : <AccordionWithImage items={ items } />
}

export default FeatureBlock
