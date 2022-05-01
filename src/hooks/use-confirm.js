import { useContext } from 'react'
import { ConfirmationDialogContext } from '~/context/confirm-context'

const useConfirm = () => {
  const { openDialog } = useContext(ConfirmationDialogContext)

  const getConfirmation = (message, dirty) =>
    new Promise((res) => {
      openDialog({ actionCallback: res, message, dirty })
    })

  return { getConfirmation }
}

export default useConfirm
