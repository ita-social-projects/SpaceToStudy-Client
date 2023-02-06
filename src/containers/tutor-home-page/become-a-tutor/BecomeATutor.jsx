import StepWrapper from '~/components/step-wrapper/StepWrapper'
import TempComponent from './TempComponent'

import GeneralInfo from '~/containers/tutor-home-page/general-info/GeneralInfo'
import { StepProvider } from '~/context/step-context'
import AddPhoto from '../add-photo/AddPhoto'

import { stepLabels } from '~/containers/tutor-home-page/constants'
import Subjects from '../subjects/Subjects'

const BecomeATutor = () => {
  const childrenArr = [
    <GeneralInfo key='1' />,
    <Subjects key='2' />,
    <TempComponent key='3'>3</TempComponent>,
    <AddPhoto key='4' />
  ]

  return (
    <StepProvider>
      <StepWrapper steps={ stepLabels }>
        { childrenArr }
      </StepWrapper>
    </StepProvider>
  )
}

export default BecomeATutor
