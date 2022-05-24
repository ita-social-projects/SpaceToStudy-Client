import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import HomeWithUserRole from '~/components/home-with-user/HomeWithUser'
import Comp from '~/components/testConfirmComponent/testConfirm'
import { ModalContext } from '~/context/modal-context'
import { loginUser } from '~/redux/user/user.actions'

const GuestHomePage = () => {
  const { setModal } = useContext(ModalContext)
  const dispatch = useDispatch()

  const handleModal = () => {
    setModal(<Comp />)
  }

  return (
    <div>
      This Is GuestHomePage Component
      
      <button onClick={ handleModal }>click</button>
      <button onClick={ () => dispatch(loginUser({ id: 1, name: 'Vasya', role: 'student' })) }>dispatch User</button>
    </div>
  )
}

export default HomeWithUserRole(GuestHomePage)
