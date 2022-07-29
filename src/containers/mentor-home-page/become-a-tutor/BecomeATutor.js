import { Box } from '@mui/material'
import StepWrapper from '~/components/step-wrapper/StepWrapper'

const stepLabels = ['General info', 'Languages', 'Study category', 'Experience', 'Documents', 'Photo and Video']

const childrenArr = [
  <Box key="1">1</Box>,
  <Box key="2">2</Box>
]

const BecomeATutor = () => {
  return (
    <StepWrapper steps={ stepLabels }>
      { childrenArr }
    </StepWrapper>
  )
}

export default BecomeATutor
