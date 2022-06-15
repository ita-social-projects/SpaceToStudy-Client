import { createContext, useCallback, useState } from 'react'
import PopupDialog from '~/components/popup-dialog/PopupDialog'

const ModalContext = createContext()

const ModalProvider = (props) => {
  const [modal, setModal] = useState()

  const closeModal = useCallback(() => {
    setModal()
  }, [setModal])

  return (
    <ModalContext.Provider value={ { setModal } } { ...props }>
      { props.children }
      { modal && <PopupDialog closeModal={ closeModal } content={ modal } /> }
    </ModalContext.Provider>
  )
}

export { ModalProvider, ModalContext }
