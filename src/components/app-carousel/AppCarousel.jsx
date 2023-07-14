import {
  ArrowBackIosRounded,
  ArrowForwardIosRounded
} from '@mui/icons-material'
import IconButton from '@mui/material/IconButton'
import Carousel from 'nuka-carousel'

const AppCarousel = ({ children, settings }) => {
  const leftArrow = ({ previousSlide }) => (
    <IconButton onClick={previousSlide} sx={settings?.leftButtonStyles}>
      <ArrowBackIosRounded sx={settings?.leftArrowStyles} />
    </IconButton>
  )

  const rightArrow = ({ nextSlide }) => (
    <IconButton onClick={nextSlide} sx={settings?.rightButtonStyles}>
      <ArrowForwardIosRounded sx={settings?.rightArrowStyles} />
    </IconButton>
  )

  return (
    <Carousel
      autoplay
      cellSpacing={24}
      renderCenterLeftControls={leftArrow}
      renderCenterRightControls={rightArrow}
      style={{ paddingBottom: '36px' }}
      withoutControls={Number(settings?.slidesToShow) >= children.length}
      wrapAround={children.length > Number(settings?.slidesToShow)}
      {...settings}
    >
      {children}
    </Carousel>
  )
}

export default AppCarousel
