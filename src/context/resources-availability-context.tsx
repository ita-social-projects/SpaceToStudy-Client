import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState
} from 'react'
import { ResourcesAvailabilityEnum } from '~/types'

interface ResourcesAvailabilityProviderProps {
  children: ReactNode
}

interface ResourcesAvailabilityContextOutput {
  resourceAvailability: ResourcesAvailabilityEnum
  setResourceAvailability: Dispatch<SetStateAction<ResourcesAvailabilityEnum>>
  isCooperation: boolean
}

const ResourcesAvailabilityContext =
  createContext<ResourcesAvailabilityContextOutput>({
    resourceAvailability: ResourcesAvailabilityEnum.OpenAll
  } as ResourcesAvailabilityContextOutput)

const ResourcesAvailabilityProvider = ({
  children
}: ResourcesAvailabilityProviderProps) => {
  const [resourceAvailability, setResourceAvailability] = useState(
    ResourcesAvailabilityEnum.OpenAll
  )

  const contextValue = useMemo(
    () => ({
      resourceAvailability,
      setResourceAvailability,
      isCooperation: true
    }),
    [resourceAvailability, setResourceAvailability]
  )

  return (
    <ResourcesAvailabilityContext.Provider value={contextValue}>
      {children}
    </ResourcesAvailabilityContext.Provider>
  )
}

const useResourceAvailabilityContext = () =>
  useContext(ResourcesAvailabilityContext)

export { ResourcesAvailabilityProvider, useResourceAvailabilityContext }
