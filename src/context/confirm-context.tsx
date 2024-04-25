import { FC, ReactNode, createContext, useMemo, useState } from 'react'
import ConfirmDialog from '~/components/confirm-dialog/ConfirmDialog'

interface OpenDialogProps {
  sendConfirm: (value: boolean) => void
  message: string
  title: string
  confirmButton?: string
  cancelButton?: string
}

interface ConfirmationDialogContext {
  openDialog: ({ sendConfirm, message, title }: OpenDialogProps) => void
  needConfirmation: boolean
  setNeedConfirmation: (value: boolean) => void
}

interface ConfirmationDialogProviderProps {
  children: ReactNode
}

export const ConfirmationDialogContext =
  createContext<ConfirmationDialogContext>({} as ConfirmationDialogContext)

export const ConfirmationDialogProvider: FC<
  ConfirmationDialogProviderProps
> = ({ children }) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const [dialogConfig, setDialogConfig] = useState<OpenDialogProps>({
    sendConfirm: (value: boolean) => value,
    message: '',
    title: '',
    confirmButton: '',
    cancelButton: ''
  })
  const [needConfirmation, setNeedConfirmation] = useState<boolean>(false)

  const openDialog = ({
    sendConfirm,
    message,
    title,
    confirmButton,
    cancelButton
  }: OpenDialogProps) => {
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
