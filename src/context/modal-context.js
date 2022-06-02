import { createContext, useCallback, useState } from 'react'
import Modal from '~/components/modal/Modal'

const ModalContext = createContext()

const ModalProvider = (props) => {
  const [modal, setModal] = useState()

  const closeModal = useCallback(() => {
    setModal()
  }, [setModal])

  return (
    <ModalContext.Provider value={ { setModal } } { ...props }>
      { props.children }
      { modal && <Modal closeModal={ closeModal } content={ modal } /> }
    </ModalContext.Provider>
  )
}

export { ModalProvider, ModalContext }
