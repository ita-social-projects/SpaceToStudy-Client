import StepWrapper from '~/components/step-wrapper/StepWrapper'
import TempComponent from './TempComponent'

const stepLabels = ['General info', 'Languages', 'Study category', 'Experience', 'Documents', 'Photo and Video']

const childrenArr = [
  <TempComponent key="1">1</TempComponent>,
  <TempComponent key="2">2</TempComponent>,
  <TempComponent key="3">3</TempComponent>,
  <TempComponent key="4">4</TempComponent>,
  <TempComponent key="5">5</TempComponent>,
  <TempComponent key="6">6</TempComponent>
]

const BecomeATutor = () => {
  return (
    <StepWrapper steps={ stepLabels }>
      { childrenArr }
    </StepWrapper>
  )
}

export default BecomeATutor
