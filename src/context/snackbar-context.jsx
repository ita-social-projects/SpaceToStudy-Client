import { createContext, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

import { snackbarVariants } from '~/constants'

export const SnackBarContext = createContext()

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

  return (
    <SnackBarContext.Provider value={ { setAlert } }>
      { children }
      <Snackbar
        anchorOrigin={ { vertical: 'top', horizontal: 'center' } }
        autoHideDuration={ duration }
        onClose={ handleClose }
        open={ show }
      >
        <Alert severity={ severity } sx={ { color: 'basic.white' } } variant='filled'>
          { t(message) }
        </Alert>
      </Snackbar>
    </SnackBarContext.Provider>
  )
}
