import { createContext, useCallback, useState } from 'react'
import PopupDialog from '~/components/popup-dialog/PopupDialog'

const ModalContext = createContext()

const ModalProvider = (props) => {
  const [modal, setModal] = useState()
  const [isFullScreen, setFullScreen] = useState(false)

  const [timer, setTimer] = useState(null)

  const closeModal = useCallback(() => {
    setModal()
    setPaperProps({})
    setTimer(null)
  }, [setModal, setPaperProps])

  const openModal = useCallback(
    (component, props) => {
      setModal(component)
      setPaperProps(props)
    },
    [setModal, setPaperProps]
  )

  const closeModalAfterDelay = (delay = 5000) => {
    const timerId = setTimeout(closeModal, delay)
    setTimer(timerId)
  }

  return (
    <ModalContext.Provider value={ { setModal, closeModal, setFullScreen, closeModalAfterDelay } } { ...props }>
      { props.children }
      { modal && (
        <PopupDialog
          closeModal={ closeModal }
          closeModalAfterDelay={ closeModalAfterDelay }
          content={ modal }
          isFullScreen={ isFullScreen }
          paperProps={ paperProps }
          setFullScreen={ setFullScreen }
          timerId={ timer }
        />
      ) }
    </ModalContext.Provider>
  )
}

export { ModalProvider, ModalContext }
