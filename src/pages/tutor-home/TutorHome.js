import { useEffect, useContext } from 'react'
import { useSelector } from 'react-redux'
import BecomeATutor from '~/containers/tutor-home-page/become-a-tutor/BecomeATutor'
import { ModalContext } from '~/context/modal-context'

const TutorHome = () => {
  const { openModal } = useContext(ModalContext)
  const { isFirstLogin } = useSelector((state) => state.appMain)

  useEffect(() => {
    if (isFirstLogin) {
      openModal({
        component: <BecomeATutor />,
        paperProps: { sx: { height: '90%', width: '90%', maxWidth: '100%' } }
      })
    }
  }, [openModal, isFirstLogin])

  return <div data-testid='tutorHome'>Hello Tutor!</div>
}

export default TutorHome
