import { useContext, useEffect } from 'react'
import { ConfirmationDialogContext } from '~/context/confirm-context'

const useConfirm = () => {
  const { openDialog, needConfirmation, setNeedConfirmation } = useContext(ConfirmationDialogContext)

  useEffect(() => {
    return () => {
      setNeedConfirmation(false)
    }
  }, [setNeedConfirmation])

  const checkConfirmation = ({ message, title }) => {
    if (needConfirmation) {
      return new Promise((res) => {
        openDialog({ sendConfirm: res, message, title })
      })
    }

    return true
  }

  return { checkConfirmation, setNeedConfirmation, openDialog }
}

export default useConfirm
