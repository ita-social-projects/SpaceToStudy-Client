import {
  FC,
  createContext,
  useContext,
  useMemo,
  useState,
  Dispatch,
  ReactElement,
  SetStateAction
} from 'react'

import { Course } from '~/types'

interface CooperationProviderContext {
  selectedCourse: Course | null
  setSelectedCourse: Dispatch<SetStateAction<Course | null>>
  isActivityCreated: boolean
  setIsActivityCreated: Dispatch<SetStateAction<boolean>>
}

interface CooperationProviderProps {
  children: ReactElement
}

const CooperationContext = createContext<CooperationProviderContext>(
  {} as CooperationProviderContext
)

const CooperationProvider: FC<CooperationProviderProps> = ({ children }) => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [isActivityCreated, setIsActivityCreated] = useState<boolean>(false)

  const contextValue = useMemo(
    () => ({
      selectedCourse,
      setSelectedCourse,
      isActivityCreated,
      setIsActivityCreated
    }),
    [selectedCourse, setSelectedCourse, isActivityCreated, setIsActivityCreated]
  )

  return (
    <CooperationContext.Provider value={contextValue}>
      {children}
    </CooperationContext.Provider>
  )
}

const useCooperationContext = () => useContext(CooperationContext)

export { CooperationProvider, useCooperationContext }
