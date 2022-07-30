import { Button } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import EastIcon from '@mui/icons-material/East'
import WestIcon from '@mui/icons-material/West'

import { styles } from './step-wrapper.styles'

const StepWrapper = ({ children, steps }) => {
  const [activeStep, setActiveStep] = useState(0)

  const { t } = useTranslation()

  const isLastStep = activeStep === steps.length - 1

  const finish = () => {
    //TODO FINISH - SEND POST REQUEST
  }

  const next = () => {
    setActiveStep((prev) => prev + 1)
  }

  const back = () => {
    setActiveStep((prev) => prev - 1)
  }

  const stepLabels = steps.map((step, index) => (
    <Box
      color='primary.500'
      key={ step }
      onClick={ () => setActiveStep(index) }
      sx={ [styles.defaultTab, index === activeStep && styles.activeTab] }
      typography="caption"
    >
      { step }
    </Box>
  ))

  const nextButton = isLastStep ? (
    <Button
      onClick={ finish }
      size='small'
      sx={ styles.btn }
      variant="contained"
    >
      { t('common.finish') }
    </Button>
  ) : (
    <Button
      onClick={ next }
      size='small'
      sx={ styles.btn }
      variant="contained"
    >
      { t('common.next') }
      <EastIcon fontSize="small" />
    </Button>
  )

  return (
    <Box sx={ styles.root }>
      <Box sx={ styles.steps }>
        { stepLabels }
      </Box>
      <Box mt='46px'>
        { children[activeStep] }
      </Box>
      <Box sx={ styles.btnWrapper }>
        <Button
          disabled={ activeStep === 0 }
          onClick={ back }
          size='small'
          sx={ styles.btn }
          variant="outlined"
        >
          <WestIcon fontSize="small" />
          { t('common.back') }
        </Button>
        { nextButton }
      </Box>
    </Box>
  )
}

export default StepWrapper
