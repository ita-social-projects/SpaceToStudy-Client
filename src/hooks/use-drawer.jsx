import { useCallback, useState } from 'react'
import useConfirm from './use-confirm'

export const useDrawer = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { setNeedConfirmation } = useConfirm()

  const closeDrawer = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  const openDrawer = useCallback(
    (confirmation) => {
      setIsOpen(true)
      setNeedConfirmation(Boolean(confirmation))
    },
    [setIsOpen, setNeedConfirmation]
  )

  return {
    isOpen,
    openDrawer,
    closeDrawer
  }
}
