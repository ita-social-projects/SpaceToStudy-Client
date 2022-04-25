import React from 'react'
import './Modal.css'


const Modal = (props) => {
  const { content, setShowModal, show } = props

  const handleCloseModal = (e) => {
    setShowModal(false)
  }

  if (!show) {
    return null
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-close">
          <button  className="close" onClick={ handleCloseModal } type="button" >X</button>
        </div>
        <div className="modal-body">
          { content }
        </div>
        <div className="modal-buttons">
        </div>
      </div>
    </div>
  )
}

export default Modal
