import { ReactNode, createContext, useCallback, useContext, useState } from 'react'
import AppDrawer from '~/components/app-drawer/AppDrawer'
import useConfirm from '~/hooks/use-confirm'

interface DrawerContextType {
  openDrawer: ({ component, confirmation }: { component: ReactNode, confirmation?: boolean }) => void
  closeDrawer: () => void
}

interface DrawerProviderProps {
  children: ReactNode
}

const DrawerContext = createContext<DrawerContextType>({} as DrawerContextType) 


export const DrawerProvider = ({ children, ...props }: DrawerProviderProps) => {
  const [drawer, setDrawer] = useState<ReactNode | null>(null)
  const { setNeedConfirmation } = useConfirm()


  const closeDrawer = useCallback(() => {
    setDrawer(null)
  }, [setDrawer])

  const openDrawer = useCallback(
    ({ component, confirmation }) => {
      setDrawer(component)
      setNeedConfirmation(confirmation)
    },
    [setDrawer, setNeedConfirmation]
  )

  const contextValue: DrawerContextType = {
    openDrawer,
    closeDrawer
  }

  return (
    <DrawerContext.Provider value={ contextValue } { ...props }>
      { children }
      <AppDrawer onClose={ closeDrawer } open={ Boolean(drawer) }>
        { drawer }
      </AppDrawer>
    </DrawerContext.Provider>
  )
}

export const useDrawerContext = () => useContext(DrawerContext)
