import React from 'react'
import { useContext } from 'react'

import Comp from '~/components/testConfirmComponent/testConfirm'
import { ModalContext } from '~/context/modal-context'
import WelcomeBlock from '~/containers/guest-home-page/WelcomeBlock'

const GuestHomePage = () => {
  const { setModal } = useContext(ModalContext)

  const handleModal = () => {
    setModal(<Comp />)
  }

  return (
    <>
      <WelcomeBlock />
      <button onClick={ handleModal }>click</button>
    </>
  )
}

export default GuestHomePage
