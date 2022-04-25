import React from 'react'


const TestButtonsForModal = (props) => {
  const { handleShowModal } = props


  return (
    <div className="buttonsForModal">
      { /* JSX props should not use functions (arrow funcs) ("react/jsx-no-bind": "error",)?? */ }
      <button name='SIGN-UP' onClick={ handleShowModal }>SIGN-UP</button> 
      <button name='SIGN-IN' onClick={ handleShowModal }>SIGN-IN</button>
      <button name='CONFIRM' onClick={ handleShowModal }>CONFIRM</button>
      <button name='RECOVER' onClick={ handleShowModal }>RECOVER</button>
    </div>
  )
}

export default TestButtonsForModal
