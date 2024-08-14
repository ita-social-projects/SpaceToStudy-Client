import {
  FC,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  ReactElement
} from 'react'
import PopupDialog from '~/components/popup-dialog/PopupDialog'
import { PaperProps } from '@mui/material/Paper'

export interface Component {
  component: ReactElement
  paperProps?: PaperProps
  customCloseModal?: () => void
}

interface ModalProvideContext {
  openModal: (component: Component, delayToClose?: number) => void
  closeModal: () => void
  customCloseModal?: () => void
}

interface ModalProviderProps {
  children: ReactElement
}

const ModalContext = createContext<ModalProvideContext>(
  {} as ModalProvideContext
)

const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [modal, setModal] = useState<ReactElement | null>(null)
  const [paperProps, setPaperProps] = useState<PaperProps>({})
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)
  const customCloseModalRef = useRef<(() => void) | undefined>()

  const closeModal = useCallback(() => {
    setModal(null)
    setPaperProps({})
    setTimer(null)
  }, [setModal, setPaperProps, setTimer])

  const closeModalAfterDelay = useCallback(
    (delay?: number) => {
      const timerId = setTimeout(closeModal, delay ?? 5000)
      setTimer(timerId)
    },
    [closeModal]
  )

  const openModal = useCallback(
    (
      { component, paperProps, customCloseModal }: Component,
      delayToClose?: number
    ) => {
      setModal(component)

      paperProps && setPaperProps(paperProps)
      delayToClose && closeModalAfterDelay(delayToClose)
      customCloseModalRef.current = customCloseModal
    },
    [setModal, setPaperProps, closeModalAfterDelay]
  )

  const contextValue = useMemo(
    () => ({ openModal, closeModal }),
    [closeModal, openModal]
  )

  const handleCloseModal = () => {
    if (customCloseModalRef.current) {
      customCloseModalRef.current()
    }
    closeModal()
  }

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {modal && (
        <PopupDialog
          closeModal={handleCloseModal}
          closeModalAfterDelay={closeModalAfterDelay}
          content={modal}
          paperProps={paperProps}
          timerId={timer}
        />
      )}
    </ModalContext.Provider>
  )
}

const useModalContext = () => useContext(ModalContext)

export { ModalProvider, useModalContext }
