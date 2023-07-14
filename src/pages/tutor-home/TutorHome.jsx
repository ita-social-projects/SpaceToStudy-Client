import { useEffect } from 'react'

import { useSelector } from 'react-redux'
import { useModalContext } from '~/context/modal-context'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'

import { styles } from '~/pages/tutor-home/TutorHome.styles'

const TutorHome = () => {
  const { openModal } = useModalContext()
  const { isFirstLogin, userRole } = useSelector((state) => state.appMain)

  useEffect(() => {
    if (isFirstLogin) {
      openModal({
        component: <UserStepsWrapper userRole={userRole} />,
        paperProps: {
          sx: styles.modal
        }
      })
    }
  }, [openModal, isFirstLogin, userRole])

  return <PageWrapper data-testid='tutorHome'>TutorHome Page</PageWrapper>
}

export default TutorHome
