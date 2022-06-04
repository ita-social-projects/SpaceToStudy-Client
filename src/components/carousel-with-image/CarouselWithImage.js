import { useState } from 'react'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'
import MobileStepper from '@mui/material/MobileStepper'
import Typography from '@mui/material/Typography'
import SwipeableViews from 'react-swipeable-views'
import { style } from './carousel.styles'

const Carousel = ({ items }) => {
  const { t } = useTranslation()
  const [activeStep, setActiveStep] = useState(0)
  const maxSteps = items.length

  const handleStepChange = (step) => {
    setActiveStep(step)
  }

  const carouselWrapper = items.map((item, index) => (
    <Box key={ index } sx={ style.feature }>
      <Box component="img" src={ item.image } sx={ style.image } />
      <Box sx={ style.text }>
        <Typography sx={ { color: 'basic.white' } } variant={ 'h6' }>
          { t(item.title) }
        </Typography>
        <Typography sx={ { color: 'basic.white', fontSize: '14px' } } variant={ 'subtitle1' }>
          { t(item.description) }
        </Typography>
      </Box>
      <MobileStepper
        activeStep={ activeStep } position='static' steps={ maxSteps }
        sx={ { pt:'16px' } }
        variant="dots"
      />
    </Box>
  ))

  return (
    <SwipeableViews enableMouseEvents index={ activeStep } onChangeIndex={ handleStepChange }>
      { carouselWrapper }
    </SwipeableViews>
  )
}
export default Carousel
