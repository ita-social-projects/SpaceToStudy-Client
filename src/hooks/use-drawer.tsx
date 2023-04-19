import { useCallback, useState } from 'react'
import useConfirm from './use-confirm'

interface UseDrawerProps {
    open: boolean
    openDrawer: ( confirmation?: boolean ) => void
    closeDrawer: () => void
  }

export const useDrawer = () : UseDrawerProps => {
  const [open, setOpen] = useState<boolean>(false)
  const { setNeedConfirmation } = useConfirm()
  
  
  const closeDrawer = useCallback(() => {
    setOpen(false)
  }, [setOpen])
  
  const openDrawer = useCallback(
    ( confirmation ) => {
      setOpen(true)
      setNeedConfirmation(confirmation)
    },
    [setOpen, setNeedConfirmation]
  )
  
  return {
    open,
    openDrawer,
    closeDrawer
  }
} 
