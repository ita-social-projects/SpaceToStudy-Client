import React, { useState } from 'react'

import Modal from '~/components/modal/Modal'
import TestButtonsForModal from '~/containers/testForModal/TestForModal'


const GuestHomePage = () => {
  const [showModal, setShowModal] = useState(false)
  const [contentForModal, setContentForModal] = useState('')

  const handleShowModal = (e) => {
    setShowModal(true)
    setContentForModal(e.target.name)
  }

  return (
    <div>
      This Is GuestHomePage Component
      <TestButtonsForModal handleShowModal={ handleShowModal } />
      <Modal content={ contentForModal } setShowModal={ setShowModal } show={ showModal } />
    </div>
  )
}

export default GuestHomePage
