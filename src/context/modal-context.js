import { createContext, useCallback, useState } from 'react'
import PopupDialog from '~/components/popup-dialog/PopupDialog'

const ModalContext = createContext()

const ModalProvider = (props) => {
  const [modal, setModal] = useState()
  const [isFullScreen, setFullScreen] = useState(false)

  const closeModal = useCallback(() => {
    setModal()
  }, [setModal])

  return (
    <ModalContext.Provider value={{ setModal, closeModal, setFullScreen }} {...props}>
      {props.children}
      {modal && (
        <PopupDialog
          closeModal={closeModal}
          content={modal}
          isFullScreen={isFullScreen}
          setFullScreen={setFullScreen}
        />
      )}
    </ModalContext.Provider>
  )
}

export { ModalProvider, ModalContext }
