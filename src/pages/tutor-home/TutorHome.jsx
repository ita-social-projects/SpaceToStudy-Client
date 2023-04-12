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
  }, [openModal, isFirstLogin])

  return <div data-testid='tutorHome'>Hello Tutor!</div>
}

export default TutorHome
