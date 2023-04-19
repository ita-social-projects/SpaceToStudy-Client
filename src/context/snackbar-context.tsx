import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'
import { useTranslation } from 'react-i18next'

import Snackbar from '@mui/material/Snackbar'
import Alert, { AlertColor } from '@mui/material/Alert'

import { snackbarVariants } from '~/constants'

interface SnackBarProviderProps {
  children: React.ReactNode
}

interface SetAllertProps {
  severity?: AlertColor
  message: string
  duration?: number
}

interface SnackBarContextOutput {
  setAlert: (options: SetAllertProps) => void
}

const SnackBarContext = createContext({} as SnackBarContextOutput)

export const SnackBarProvider = ({ children }: SnackBarProviderProps) => {
  const { t } = useTranslation()
  const [show, setShow] = useState<boolean>(false)
  const [severity, setSeverity] = useState<AlertColor>(snackbarVariants.info)
  const [message, setMessage] = useState<string>('')
  const [duration, setDuration] = useState<number>(0)

  const setAlert = useCallback((options) => {
    setShow(true)
    setSeverity(options.severity)
    setMessage(options.message)
    setDuration(options.duration || 4000)
  }, [])

  const handleClose = () => {
    setShow(false)
  }

  const contextValue = useMemo(() => ({ setAlert }), [setAlert])

  return (
    <SnackBarContext.Provider value={contextValue}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={duration}
        onClose={handleClose}
        open={show}
      >
        <Alert
          severity={severity}
          sx={{ color: 'basic.white' }}
          variant='filled'
        >
          {t(message)}
        </Alert>
      </Snackbar>
    </SnackBarContext.Provider>
  )
}

export const useSnackBarContext = () => useContext(SnackBarContext)
