import { useEffect, useContext } from 'react'
import { useSelector } from 'react-redux'
import BecomeATutor from '~/containers/mentor-home-page/become-a-tutor/BecomeATutor'
import { ModalContext } from '~/context/modal-context'

const MentorHome = () => {
  const { setModal, setFullScreen, setPaperProps } = useContext(ModalContext)
  const { isFirstLogin } = useSelector((state) => state.appMain)

  useEffect(() => {
    if (isFirstLogin) {
      setPaperProps({ sx: { height: 'calc(100% - 48px)', m: 4 } })
      setFullScreen(true)
      setModal(<BecomeATutor />)
    }
  }, [setModal, isFirstLogin, setFullScreen, setPaperProps])

  return <div data-testid='mentorHome'>Hello Mentor!</div>
}

export default MentorHome
