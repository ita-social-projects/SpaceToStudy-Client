import { Button } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import backArrow from '~/assets/img/step-wrapper/backArrow.svg'
import nextArrow from '~/assets/img/step-wrapper/nextArrow.svg'

import { styles } from './step-wrapper.styles'

const StepWrapper = ({ children, steps }) => {
  const [activeStep, setActiveStep] = useState(0)

  const { t } = useTranslation()

  const isLastStep = activeStep === steps.length - 1

  const stepLabels = steps.map((step, index) => (
    <Box
      key={ step }
      onClick={ () => setActiveStep(index) }
      sx={ [styles.defaultTab, index === activeStep && styles.activeTab] }
      typography="body2"
    >
      { step }
    </Box>
  ))

  const next = () => {
    if (activeStep === steps.length - 1) {
      //TODO FINISH - SEND POST REQUEST
    } else {
      setActiveStep((prev) => prev + 1)
    }
  }

  const back = () => {
    setActiveStep((prev) => prev - 1)
  }

  return (
    <Box sx={ styles.root }>
      <Box sx={ styles.steps }>
        { stepLabels }
      </Box>
      <Box sx={ { mt: '46px' } }>
        { children[activeStep] }
      </Box>
      <Box sx={ styles.btnWrapper }>
        <Button
          disabled={ activeStep === 0 }
          onClick={ back }
          sx={ [styles.btn, { color: 'primary.500' }] }
          variant="outlined"
        >
          <Box alt="backArrow" component="img" src={ backArrow } />
          <Box sx={ { ml: '10px' } }>
            { t('common.back') }
          </Box>
        </Button>
        <Button onClick={ next } sx={ [styles.btn, { ml: '168px', color: 'primary.50' }] } variant="contained">
          <Box sx={ { mr: '10px' } }>
            { isLastStep ? t('common.finish') : t('common.next') }
          </Box>
          <Box alt="nextArrow" component="img" src={ nextArrow } />
        </Button>
      </Box>
    </Box>
  )
}

export default StepWrapper
