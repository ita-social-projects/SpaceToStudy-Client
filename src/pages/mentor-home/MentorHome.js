import { useEffect, useContext } from 'react'
import { useSelector } from 'react-redux'
import BecomeATutor from '~/containers/mentor-home-page/become-a-tutor/BecomeATutor'
import { ModalContext } from '~/context/modal-context'

const MentorHome = () => {
  const { setModal, setPaperProps } = useContext(ModalContext)
  const { isFirstLogin } = useSelector((state) => state.appMain)

  useEffect(() => {
    if (isFirstLogin) {
      setPaperProps({ sx: { height: '90%', width: '90%', maxWidth: '100%' } })
      setModal(<BecomeATutor />)
    }
  }, [setModal, isFirstLogin, setPaperProps])

  return <div data-testid='mentorHome'>Hello Mentor!</div>
}

export default MentorHome
