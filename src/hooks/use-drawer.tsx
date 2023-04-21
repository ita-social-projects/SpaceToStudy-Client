import { useCallback, useState } from 'react'
import useConfirm from './use-confirm'

interface UseDrawerProps {
  isOpen: boolean
  openDrawer: (confirmation?: boolean) => void
  closeDrawer: () => void
}

export const useDrawer = (): UseDrawerProps => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { setNeedConfirmation } = useConfirm()

  const closeDrawer = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  const openDrawer = useCallback(
    (confirmation?: boolean) => {
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
