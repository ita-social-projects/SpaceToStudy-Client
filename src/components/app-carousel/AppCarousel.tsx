import { FC, ReactNode } from 'react'
import Carousel, { ControlProps, CarouselProps } from 'nuka-carousel'
import IconButton from '@mui/material/IconButton'
import {
  ArrowBackIosRounded,
  ArrowForwardIosRounded
} from '@mui/icons-material'
import { SxProps } from '@mui/material'

interface Settings extends CarouselProps {
  leftButtonStyles: SxProps
  leftArrowStyles: SxProps
  rightButtonStyles: SxProps
  rightArrowStyles: SxProps
}

interface AppCarouselProps {
  children: ReactNode[]
  settings?: Settings
}

const AppCarousel: FC<AppCarouselProps> = ({ children, settings }) => {
  const leftArrow = ({ previousSlide }: ControlProps) => (
    <IconButton onClick={previousSlide} sx={settings?.leftButtonStyles}>
      <ArrowBackIosRounded sx={settings?.leftArrowStyles} />
    </IconButton>
  )

  const rightArrow = ({ nextSlide }: ControlProps) => (
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
