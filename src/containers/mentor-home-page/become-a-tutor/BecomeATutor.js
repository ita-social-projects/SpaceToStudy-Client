import { Box } from '@mui/material'
import { useState } from 'react'
import StepWrapper from '~/components/step-wrapper/StepWrapper'

const stepLabels = ['General info', 'Languages', 'Study category', 'Experience', 'Documents', 'Photo and Video']

const BecomeATutor = () => {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <StepWrapper activeStep={ activeStep } setActiveStep={ setActiveStep } steps={ stepLabels }>
      <Box sx={ { mt: '46px' } }>
        { activeStep === 0 && <Box>1</Box> }
        { activeStep === 1 && <Box>2</Box> }
      </Box>
    </StepWrapper>
  )
}

export default BecomeATutor
