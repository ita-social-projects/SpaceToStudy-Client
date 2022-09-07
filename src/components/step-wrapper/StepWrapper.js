import { useState, cloneElement } from 'react'
import { useTranslation } from 'react-i18next'

import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

import EastIcon from '@mui/icons-material/East'
import WestIcon from '@mui/icons-material/West'

import { styles } from './StepWrapper.styles'

const StepWrapper = ({ children, steps, handleSubmit, stepErrors }) => {
  const [activeStep, setActiveStep] = useState(0)

  const { t } = useTranslation()

  const isLastStep = activeStep === steps.length - 1

  const next = () => {
    setActiveStep((prev) => prev + 1)
  }

  const back = () => {
    setActiveStep((prev) => prev - 1)
  }

  const stepLabels = steps.map((step, index) => (
    <Box
      color={ stepErrors[step] ? 'error.500' : 'primary.500' }
      key={ step }
      onClick={ () => setActiveStep(index) }
      sx={ [styles.defaultTab, index === activeStep && styles.activeTab] }
      typography='caption'
    >
      { step }
    </Box>
  ))

  const nextButton = isLastStep ? (
    <Button
      onClick={ handleSubmit } size='small' sx={ styles.btn }
      variant='contained'
    >
      { t('common.finish') }
    </Button>
  ) : (
    <Button
      onClick={ next } size='small' sx={ styles.btn }
      variant='contained'
    >
      { t('common.next') }
      <EastIcon fontSize='small' />
    </Button>
  )

  const btnsBox = (
    <Box sx={ styles.btnWrapper }>
      <Button
        disabled={ activeStep === 0 } onClick={ back } size='small'
        sx={ styles.btn } variant='outlined'
      >
        <WestIcon fontSize='small' />
        { t('common.back') }
      </Button>
      { nextButton }
    </Box>
  )

  return (
    <Container sx={ styles.root }>
      <Box sx={ styles.steps }>
        { stepLabels }
      </Box>
      <Box mt='46px'>
        { cloneElement(children[activeStep], { btnsBox, stepLabel: steps[activeStep] }) }
      </Box>
    </Container>
  )
}

export default StepWrapper
