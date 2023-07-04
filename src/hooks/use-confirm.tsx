import { useContext, useEffect } from 'react'
import { ConfirmationDialogContext } from '~/context/confirm-context'

interface ConfirmationDialogProps {
  message: string
  title: string
  check?: boolean
  confirmButton?: string
  cancelButton?: string
}

interface OpenDialogProps extends ConfirmationDialogProps {
  sendConfirm: (value: boolean) => void
}

interface UseConfirmResult {
  checkConfirmation: ({
    message,
    title
  }: ConfirmationDialogProps) => boolean | Promise<boolean>
  setNeedConfirmation: (value: boolean) => void
  openDialog: ({
    sendConfirm,
    message,
    title,
    confirmButton,
    cancelButton
  }: OpenDialogProps) => void
}

const useConfirm = (): UseConfirmResult => {
  const { openDialog, needConfirmation, setNeedConfirmation } = useContext(
    ConfirmationDialogContext
  )

  useEffect(() => {
    return () => {
      setNeedConfirmation(false)
    }
  }, [setNeedConfirmation])

  const checkConfirmation = ({
    message,
    title,
    confirmButton,
    cancelButton,
    check
  }: ConfirmationDialogProps): boolean | Promise<boolean> => {
    if (needConfirmation || check) {
      return new Promise((res) => {
        openDialog({
          sendConfirm: res,
          message,
          title,
          confirmButton,
          cancelButton
        })
      })
    }

    return true
  }

  return { checkConfirmation, setNeedConfirmation, openDialog }
}

export default useConfirm
