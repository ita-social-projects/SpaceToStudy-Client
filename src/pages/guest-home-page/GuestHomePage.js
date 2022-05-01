import React, { useContext } from 'react'
import { ModalContext } from '~/context/modal-context'

const GuestHomePage = () => {
  const { setModal } = useContext(ModalContext)

  const handleModal = () => {
    setModal(<h1>Hello Space2Study!!!</h1>)
  }

  return (
    <div>
      This Is GuestHomePage Component
      
      <button onClick={ handleModal }>click</button>
    </div>
  )
}

export default GuestHomePage
