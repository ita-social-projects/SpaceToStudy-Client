import { createContext, useState } from 'react'
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

  const setAlert = (options) => {
    setShow(true)
    setSeverity(options.severity)
    setMessage(options.message)
  }

  const handleClose = () => {
    setShow(false)
  }

  return (
    <SnackBarContext.Provider value={ { setAlert } }>
      { children }
      <Snackbar
        anchorOrigin={ { vertical: 'top', horizontal: 'center' } }
        autoHideDuration={ 4000 }
        onClose={ handleClose }
        open={ show }
      >
        <Alert severity={ severity } variant='filled'>
          { t(message) }
        </Alert>
      </Snackbar>
    </SnackBarContext.Provider>
  )
}
