import { useState } from 'react'
import StepWrapper from '~/components/step-wrapper/StepWrapper'

import GeneralInfo from '~/containers/tutor-home-page/general-info/GeneralInfo'
import { StepProvider } from '~/context/step-context'
import AddPhoto from '../add-photo/AddPhoto'

import { stepLabels } from '~/containers/tutor-home-page/constants'
import Subjects from '~/containers/tutor-home-page/subjects/Subjects'
import LanguageStep from '~/containers/tutor-home-page/language-step/LanguageStep'

const BecomeATutor = () => {
  const [isUserFetched, setIsUserFetched] = useState(false)

  const childrenArr = [
    <GeneralInfo isUserFetched={ isUserFetched } key='1' setIsUserFetched={ setIsUserFetched } />,
    <Subjects key='2' />,
    <LanguageStep key='3' />,
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
