import { useContext } from 'react'
import Comp from '~/components/testConfirmComponent/testConfirm'
import { ModalContext } from '~/context/modal-context'
import MapSection from '~/context/map-section'

const GuestHomePage = () => {
  const { setModal } = useContext(ModalContext)

  const handleModal = () => {
    setModal(<Comp />)
  }

  return (
    <div>
      This Is GuestHomePage Component
      <button onClick={handleModal}>click</button>
      <MapSection />
    </div>
  )
}

export default GuestHomePage
