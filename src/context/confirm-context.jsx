import { createContext, useMemo, useState } from 'react'
import ConfirmDialog from '~/components/confirm-dialog/ConfirmDialog'

export const ConfirmationDialogContext = createContext({})

export const ConfirmationDialogProvider = ({ children }) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogConfig, setDialogConfig] = useState({
    sendConfirm: (value) => value,
    message: '',
    title: '',
    confirmButton: '',
    cancelButton: ''
  })
  const [needConfirmation, setNeedConfirmation] = useState(false)

  const openDialog = ({
    sendConfirm,
    message,
    title,
    confirmButton,
    cancelButton
  }) => {
    setDialogOpen(true)
    setDialogConfig({
      sendConfirm,
      message,
      title,
      confirmButton,
      cancelButton
    })
  }

  const onConfirm = () => {
    dialogConfig.sendConfirm(true)
    setDialogOpen(false)
  }

  const onDismiss = () => {
    dialogConfig.sendConfirm(false)
    setDialogOpen(false)
  }

  const contextValue = useMemo(
    () => ({ openDialog, needConfirmation, setNeedConfirmation }),
    [needConfirmation]
  )

  return (
    <ConfirmationDialogContext.Provider value={contextValue}>
      <ConfirmDialog
        cancelButton={dialogConfig.cancelButton}
        confirmButton={dialogConfig.confirmButton}
        message={dialogConfig.message}
        onConfirm={onConfirm}
        onDismiss={onDismiss}
        open={dialogOpen}
        title={dialogConfig.title}
      />
      {children}
    </ConfirmationDialogContext.Provider>
  )
}
