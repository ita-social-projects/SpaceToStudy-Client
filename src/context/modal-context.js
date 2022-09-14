import { createContext, useCallback, useState } from 'react'
import PopupDialog from '~/components/popup-dialog/PopupDialog'

const ModalContext = createContext()

const ModalProvider = (props) => {
  const [modal, setModal] = useState()
  const [paperProps, setPaperProps] = useState({})

  const [timer, setTimer] = useState(null)

  const closeModal = useCallback(() => {
    setModal()
    setPaperProps({})
    setTimer(null)
  }, [setModal, setPaperProps, setTimer])

  const closeModalAfterDelay = useCallback(
    (delay = 5000) => {
      const timerId = setTimeout(closeModal, delay)
      setTimer(timerId)
    },
    [closeModal]
  )

  const openModal = useCallback(
    ({ component, paperProps }, delayToClose = 0) => {
      setModal(component)
      setPaperProps(paperProps)
      delayToClose && closeModalAfterDelay(delayToClose)
    },
    [setModal, setPaperProps, closeModalAfterDelay]
  )

  return (
    <ModalContext.Provider value={ { openModal, closeModal } } { ...props }>
      { props.children }
      { modal && (
        <PopupDialog
          closeModal={ closeModal }
          closeModalAfterDelay={ closeModalAfterDelay }
          content={ modal }
          paperProps={ paperProps }
          timerId={ timer }
        />
      ) }
    </ModalContext.Provider>
  )
}

export { ModalProvider, ModalContext }
