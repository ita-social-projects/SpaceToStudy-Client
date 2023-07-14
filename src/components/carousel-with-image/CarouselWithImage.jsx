import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import SwipeableViews from 'react-swipeable-views'

import Box from '@mui/material/Box'
import MobileStepper from '@mui/material/MobileStepper'
import Typography from '@mui/material/Typography'

import { styles } from '~/components/carousel-with-image/CarouselWithImage.styles'

const CarouselWithImage = ({ items }) => {
  const { t } = useTranslation()
  const [activeStep, setActiveStep] = useState(0)

  const handleStepChange = (step) => {
    setActiveStep(step)
  }

  const carouselWrapper = items.map((item) => (
    <Box data-testid='carousel' key={item.title} sx={styles.feature}>
      <Box
        alt={item.image}
        component='img'
        src={item.image}
        sx={styles.image}
      />
      <Box sx={styles.text}>
        <Typography sx={styles.title}>{t(item.title)}</Typography>
        <Typography sx={styles.description}>{t(item.description)}</Typography>
      </Box>
    </Box>
  ))

  return (
    <>
      <SwipeableViews
        enableMouseEvents
        index={activeStep}
        onChangeIndex={handleStepChange}
      >
        {carouselWrapper}
      </SwipeableViews>
      <MobileStepper
        activeStep={activeStep}
        backButton={null}
        nextButton={null}
        position='static'
        steps={items.length}
        sx={styles.steper}
        variant='dots'
      />
    </>
  )
}
export default CarouselWithImage
