import { useContext, useEffect } from 'react'
import { ConfirmationDialogContext } from '~/context/confirm-context'
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom'

const useConfirm = () => {
  const { openDialog, needConfirmation, setNeedConfirmation } = useContext(ConfirmationDialogContext)
  const { navigator } = useContext(NavigationContext)

  useEffect(() => {
    const unblock = navigator.block()

    if (!needConfirmation) {
      unblock()
    }

    return () => unblock()
  }, [needConfirmation, navigator])

  const checkConfirmation = ({ message, title }) => {
    if (needConfirmation) {
      return new Promise((res) => {
        openDialog({ sendConfirm: res, message, title })
      })
    }

    return true
  }

  return { checkConfirmation, setNeedConfirmation }
}

export default useConfirm
