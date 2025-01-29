import { cloneElement } from 'react'
import { useTranslation } from 'react-i18next'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

import EastIcon from '@mui/icons-material/East'
import WestIcon from '@mui/icons-material/West'

import Button from '~scss-components/button/Button'
import useSteps from '~/hooks/use-steps'
import { styles } from '~/components/step-wrapper/StepWrapper.styles'

interface StepWrapperProps {
  children: JSX.Element[]
  steps: string[]
}

const StepWrapper = ({ children, steps }: StepWrapperProps) => {
  const { activeStep, stepErrors, isLastStep, loading, stepOperation } =
    useSteps({
      steps
    })
  const { next, back, setActiveStep, handleSubmit } = stepOperation
  const { t } = useTranslation()

  const stepLabels = steps.map((step, index) => (
    <Box
      color={stepErrors[index] ? 'error.500' : 'primary.500'}
      key={step}
      onClick={() => setActiveStep(index)}
      sx={[styles.defaultTab, index === activeStep && styles.activeTab]}
      typography='caption'
    >
      {t(`step.stepLabels.${step}`)}
    </Box>
  ))

  const nextButton = isLastStep ? (
    <Button loading={loading} onClick={() => void handleSubmit()} size='sm'>
      {t('common.finish')}
    </Button>
  ) : (
    <Button endIcon={<EastIcon fontSize='small' />} onClick={next} size='sm'>
      {t('common.next')}
    </Button>
  )

  const btnsBox = (
    <Box sx={styles.btnWrapper}>
      <Button
        disabled={activeStep === 0}
        onClick={back}
        size='sm'
        startIcon={<WestIcon fontSize='small' />}
        variant='text-secondary'
      >
        {t('common.back')}
      </Button>
      {nextButton}
    </Box>
  )

  return (
    <Container sx={styles.root}>
      <Box sx={styles.steps}>{stepLabels}</Box>
      <Box sx={styles.stepContent}>
        {cloneElement(children[activeStep], { btnsBox })}
      </Box>
    </Container>
  )
}

export default StepWrapper
