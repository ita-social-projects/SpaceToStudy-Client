import { useContext } from 'react'
import Comp from '~/components/testConfirmComponent/testConfirm'
import { ModalContext } from '~/context/modal-context'

const GuestHomePage = () => {
  const { setModal } = useContext(ModalContext)

  const handleModal = () => {
    setModal(<Comp />)
  }

  return (
    <div>
      This Is GuestHomePage Component
      
      <button onClick={ handleModal }>click</button>
    </div>
  )
}

export default GuestHomePage
