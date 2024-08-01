import { FC, ReactNode } from 'react'
import { Carousel, CarouselProps, useCarousel } from 'nuka-carousel'
import IconButton from '@mui/material/IconButton'
import {
  ArrowBackIosRounded,
  ArrowForwardIosRounded
} from '@mui/icons-material'
import { Box, Container, SxProps } from '@mui/material'
import { styles } from './AppCarousel.styles'

interface Settings extends CarouselProps {
  leftButtonStyles: SxProps
  leftArrowStyles: SxProps
  rightButtonStyles: SxProps
  rightArrowStyles: SxProps
  slidesToShow: number
}

interface AppCarouselProps {
  settings?: Settings
  children: ReactNode
}

const CustomArrows = ({ settings }: { settings?: Settings }) => {
  const { goBack, goForward } = useCarousel()

  const leftArrow = (
    <IconButton onClick={goBack} sx={settings?.leftButtonStyles}>
      <ArrowBackIosRounded sx={settings?.leftArrowStyles} />
    </IconButton>
  )

  const rightArrow = (
    <IconButton onClick={goForward} sx={settings?.rightButtonStyles}>
      <ArrowForwardIosRounded sx={settings?.rightArrowStyles} />
    </IconButton>
  )

  return (
    <Box sx={styles.arrowsWrapper}>
      {leftArrow}
      {rightArrow}
    </Box>
  )
}

const AppCarousel: FC<AppCarouselProps> = ({ settings, children }) => {
  return (
    <Container disableGutters sx={styles.carouselContainer}>
      <Carousel
        arrows={<CustomArrows settings={settings} />}
        autoplay
        showArrows='always'
        wrapMode='wrap'
        {...settings}
      >
        <Box sx={styles.childrenWrapper}>{children}</Box>
      </Carousel>
    </Container>
  )
}

export default AppCarousel
