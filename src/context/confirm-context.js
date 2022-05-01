import { createContext, useState } from 'react'
import ConfirmDialog from '../components/ConfirmDialog/ConfirmDialog'

export const ConfirmationDialogContext = createContext({})

export const ConfirmationDialogProvider = ({ children }) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogConfig, setDialogConfig] = useState({})

  const openDialog = ({ actionCallback, message, dirty }) => {
    if (dirty) {
      setDialogOpen(true)
      setDialogConfig({ actionCallback, message })
    }
  }

  const onConfirm = () => {
    dialogConfig.actionCallback(true)
    setDialogOpen(false)
  }

  const onDismiss = () => {
    dialogConfig.actionCallback(false)
    setDialogOpen(false)
  }

  return (
    <ConfirmationDialogContext.Provider value={ { openDialog } }>
      <ConfirmDialog
        message={ dialogConfig.message }
        onConfirm={ onConfirm } 
        onDismiss={ onDismiss }
        open={ dialogOpen }
      />
      { children }
    </ConfirmationDialogContext.Provider>
  )
}
