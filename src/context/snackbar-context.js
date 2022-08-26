import { createContext, useState } from 'react'
import { Snackbar, Alert } from '@mui/material'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

export const SnackBarContext = createContext()

export const SnackBarProvider = ({ children }) => {
  const { error } = useSelector((state) => state.appMain)
  const [showError, setShowError] = useState(false)
  const { t } = useTranslation()

  const handleClose = () => setShowError(false)

  return (
    <SnackBarContext.Provider value={ { setShowError } }>
      { children }
      <Snackbar autoHideDuration={ 4000 } onClose={ handleClose } open={ showError }>
        <Alert elevation={ 6 } severity={ 'error' } variant='filled'>
          { t(`errors.${error}`) }
        </Alert>
      </Snackbar>
    </SnackBarContext.Provider>
  )
}
