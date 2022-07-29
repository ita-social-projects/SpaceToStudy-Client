import { useEffect, useContext } from 'react'
import BecomeATutor from '~/containers/mentor-home-page/become-a-tutor/BecomeATutor'
import { ModalContext } from '~/context/modal-context'

const MentorHome = () => {
  const { setModal, setFullScreen } = useContext(ModalContext)

  useEffect(() => {
    setFullScreen(true)
    setModal(<BecomeATutor />)
  }, [setModal, setFullScreen])

  return <div data-testid="mentorHome">Hello Mentor!</div>
}

export default MentorHome
