import StepWrapper from '~/components/step-wrapper/StepWrapper'
import TempComponent from './TempComponent'

const stepLabels = ['General info', 'Languages', 'Study category', 'Experience', 'Documents', 'Photo and Video']

const childrenArr = [
  <TempComponent key="1" />,
  <TempComponent key="2" />,
  <TempComponent key="3" />,
  <TempComponent key="4" />,
  <TempComponent key="5" />,
  <TempComponent key="6" />
]

const BecomeATutor = () => {
  return (
    <StepWrapper steps={ stepLabels }>
      { childrenArr }
    </StepWrapper>
  )
}

export default BecomeATutor
