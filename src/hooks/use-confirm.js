import { useContext } from 'react'
import { ConfirmationDialogContext } from '~/context/confirm-context'

const useConfirm = () => {
  const { openDialog, needCofirmation, setNeedConfirmation } = useContext(ConfirmationDialogContext)

  const checkConfirmation = ({ message, title }) => {
    if (needCofirmation) {
      return new Promise((res) => {
        openDialog({ sendConfirm: res, message, title })
      })
    }

    return true
  }

  return { checkConfirmation, setNeedConfirmation }
}

export default useConfirm
