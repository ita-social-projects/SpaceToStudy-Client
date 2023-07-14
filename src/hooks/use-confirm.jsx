import { useContext, useEffect } from 'react'
import { ConfirmationDialogContext } from '~/context/confirm-context'

const useConfirm = () => {
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
  }) => {
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
