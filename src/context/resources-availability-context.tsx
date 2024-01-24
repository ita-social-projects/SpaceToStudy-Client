import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState
} from 'react'
import { ResourcesAvailability } from '~/types'

interface ResourcesAvailabilityProviderProps {
  children: ReactNode
}

interface ResourcesAvailabilityContextOutput {
  resourceAvailability: ResourcesAvailability
  setResourceAvailability: Dispatch<SetStateAction<ResourcesAvailability>>
  isCooperation: boolean
}

const ResourcesAvailabilityContext =
  createContext<ResourcesAvailabilityContextOutput>({
    resourceAvailability: ResourcesAvailability.openAll
  } as ResourcesAvailabilityContextOutput)

const ResourcesAvailabilityProvider = ({
  children
}: ResourcesAvailabilityProviderProps) => {
  const [resourceAvailability, setResourceAvailability] = useState(
    ResourcesAvailability.openAll
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
