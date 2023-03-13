import { cloneElement } from 'react'
import { useTranslation } from 'react-i18next'

import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

import EastIcon from '@mui/icons-material/East'
import WestIcon from '@mui/icons-material/West'

import useSteps from '~/hooks/use-steps'
import { styles } from '~/components/step-wrapper/StepWrapper.styles'

const StepWrapper = ({ children, steps }) => {
  const { activeStep, stepErrors, isLastStep, stepOperation } = useSteps({ steps })
  const { next, back, setActiveStep, handleSubmit } = stepOperation
  const { t } = useTranslation()

  const stepLabels = steps.map((step, index) => (
    <Box
      color={ stepErrors[index] ? 'error.500' : 'primary.500' }
      key={ step }
      onClick={ () => setActiveStep(index) }
      sx={ [styles.defaultTab, index === activeStep && styles.activeTab] }
      typography='caption'
    >
      { t(`becomeTutor.stepLabels.${step}`) }
    </Box>
  ))

  const nextButton = isLastStep ? (
    <Button
      onClick={ handleSubmit } size='small' sx={ styles.finishBtn }
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
      <Box sx={ styles.stepContent }>
        { cloneElement(children[activeStep], { btnsBox, stepLabel: steps[activeStep] }) }
      </Box>
    </Container>
  )
}

export default StepWrapper
