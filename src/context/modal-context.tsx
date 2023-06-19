import {
  FC,
  useEffect,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'
import { useLocation } from 'react-router-dom'
import PopupDialog from '~/components/popup-dialog/PopupDialog'
import { PaperProps } from '@mui/material/Paper'

interface Component {
  component: React.ReactElement
  paperProps?: PaperProps
}

interface ModalProvideContext {
  openModal: (component: Component, delayToClose?: number) => void
  closeModal: () => void
}

interface ModalProviderProps {
  children: React.ReactElement
}

const ModalContext = createContext<ModalProvideContext>(
  {} as ModalProvideContext
)

const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [modal, setModal] = useState<React.ReactElement | null>(null)
  const [paperProps, setPaperProps] = useState<PaperProps>({})
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)
  const { pathname } = useLocation()

  const closeModal = useCallback(() => {
    setModal(null)
    setPaperProps({})
    setTimer(null)
  }, [setModal, setPaperProps, setTimer])

  useEffect(() => {
    modal && closeModal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const closeModalAfterDelay = useCallback(
    (delay?: number) => {
      const timerId = setTimeout(closeModal, delay ?? 5000)
      setTimer(timerId)
    },
    [closeModal]
  )

  const openModal = useCallback(
    ({ component, paperProps }: Component, delayToClose?: number) => {
      setModal(component)
      paperProps && setPaperProps(paperProps)
      delayToClose && closeModalAfterDelay(delayToClose)
    },
    [setModal, setPaperProps, closeModalAfterDelay]
  )

  const contextValue = useMemo(
    () => ({ openModal, closeModal }),
    [closeModal, openModal]
  )

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {modal && (
        <PopupDialog
          closeModal={closeModal}
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
