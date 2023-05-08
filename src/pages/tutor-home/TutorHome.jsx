import { useEffect, useContext } from 'react'
import { useSelector } from 'react-redux'

import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'
import { ModalContext } from '~/context/modal-context'

const TutorHome = () => {
  const { openModal } = useContext(ModalContext)
  const { isFirstLogin, userRole } = useSelector((state) => state.appMain)

  useEffect(() => {
    if (isFirstLogin) {
      openModal({
        component: <UserStepsWrapper userRole={userRole} />,
        paperProps: {
          sx: {
            maxHeight: { sm: '652px' },
            height: '100%',
            maxWidth: '1130px',
            width: '100%'
          }
        }
      })
    }
  }, [openModal, isFirstLogin, userRole])

  return <div data-testid='tutorHome'>Hello Tutor!</div>
}

export default TutorHome
