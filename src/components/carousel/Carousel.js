import * as React from 'react'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'
import MobileStepper from '@mui/material/MobileStepper'
import Typography from '@mui/material/Typography'
import SwipeableViews from 'react-swipeable-views'

const style = {
  feature: {
    display: { xs: 'flex', sm: 'none' },
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  image: {
    maxWidth: '343px',
    maxHeight: '216px',
    pb: '16px'
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    width: '290px',
    height: '144px',
    backgroundColor: 'primary.900',
    boxShadow: 'shadows.primary',
    borderRadius: '6px',
    p: '16px'
  }
}

const Carousel = ({ items }) => {
  const { t } = useTranslation()
  const [activeStep, setActiveStep] = React.useState(0)
  const maxSteps = items.length

  const handleStepChange = (step) => {
    setActiveStep(step)
  }

  const carouselWrapper = items.map((item, key) => (
    <Box key={ key } sx={ style.feature }>
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
        activeStep={ activeStep } position="static" steps={ maxSteps }
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
