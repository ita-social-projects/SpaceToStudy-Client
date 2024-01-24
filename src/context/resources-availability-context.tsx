import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
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

  return (
    <ResourcesAvailabilityContext.Provider
      value={{
        resourceAvailability,
        setResourceAvailability,
        isCooperation: true
      }}
    >
      {children}
    </ResourcesAvailabilityContext.Provider>
  )
}

const useResourceAvailabilityContext = () =>
  useContext(ResourcesAvailabilityContext)

export { ResourcesAvailabilityProvider, useResourceAvailabilityContext }
