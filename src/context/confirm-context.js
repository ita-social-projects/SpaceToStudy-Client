import { createContext, useState } from 'react'
import ConfirmDialog from '~/components/confirm-dialog/ConfirmDialog'

export const ConfirmationDialogContext = createContext({})

export const ConfirmationDialogProvider = ({ children }) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogConfig, setDialogConfig] = useState({})
  const [needCofirmation, setNeedConfirmation] = useState(false)

  const openDialog = ({ sendConfirm, message, title }) => {
    setDialogOpen(true)
    setDialogConfig({ sendConfirm, message, title })
  }

  const onConfirm = () => {
    dialogConfig.sendConfirm(true)
    setDialogOpen(false)
  }

  const onDismiss = () => {
    dialogConfig.sendConfirm(false)
    setDialogOpen(false)
  }

  return (
    <ConfirmationDialogContext.Provider value={ { openDialog, needCofirmation, setNeedConfirmation } }>
      <ConfirmDialog
        message={ dialogConfig.message }
        onConfirm={ onConfirm } 
        onDismiss={ onDismiss }
        open={ dialogOpen }
        title={ dialogConfig.title }
      />
      { children }
    </ConfirmationDialogContext.Provider>
  )
}
