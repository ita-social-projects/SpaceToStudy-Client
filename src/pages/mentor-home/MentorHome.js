import { useEffect, useContext } from 'react'
import { useSelector } from 'react-redux'
import BecomeATutor from '~/containers/mentor-home-page/become-a-tutor/BecomeATutor'
import { ModalContext } from '~/context/modal-context'

const MentorHome = () => {
  const { setModal, setFullScreen } = useContext(ModalContext)
  const { isFirstLogin } = useSelector((state) => state.appMain)

  useEffect(() => {
    if (isFirstLogin) {
      setFullScreen(true)
      setModal(<BecomeATutor />)
    }
  }, [setModal, setFullScreen, isFirstLogin])

  return <div data-testid='mentorHome'>Hello Mentor!</div>
}

export default MentorHome
