import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'
import { useTranslation } from 'react-i18next'

import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

import { snackbarVariants } from '~/constants'

const SnackBarContext = createContext({})

export const SnackBarProvider = ({ children }) => {
  const { t } = useTranslation()
  const [show, setShow] = useState(false)
  const [severity, setSeverity] = useState(snackbarVariants.info)
  const [message, setMessage] = useState('')
  const [duration, setDuration] = useState(0)

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
