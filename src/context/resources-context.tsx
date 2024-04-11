import {
  FC,
  createContext,
  useContext,
  useMemo,
  Dispatch,
  ReactElement,
  useReducer
} from 'react'

import { Attachment, Lesson, Quiz } from '~/types'
import { ResourcesTabsEnum as ResourcesTypes } from '~/types'

interface ResourcesProviderContext {
  state: ResourcesStateType
  dispatch: Dispatch<ResourceAction>
}
export enum ResourceActionTypes {
  ADD = 'Add_resource',
  EDIT = 'Edit_resource',
  DELETE = 'Delete_resource'
}

type ResourcesStateType = Partial<
  Record<ResourcesTypes, Attachment[] | Lesson[] | Quiz[]>
>

interface ResourceAction {
  type: ResourceActionTypes
  resourceType: ResourcesTypes
  itemId?: string
  payload?: Array<Attachment | Quiz | Lesson>
}

interface ResourcesProviderProps {
  children: ReactElement
}

const ResourcesContext = createContext<ResourcesProviderContext>(
  {} as ResourcesProviderContext
)

const initialState: ResourcesStateType = {
  [ResourcesTypes.Lessons]: [],
  [ResourcesTypes.Quizzes]: [],
  [ResourcesTypes.Attachments]: []
}

const ResourcesProvider: FC<ResourcesProviderProps> = ({ children }) => {
  const resourceReducer = (
    state: ResourcesStateType,
    action: ResourceAction
  ) => {
    const returningState = state[action.resourceType] || []
    const newResources = action.payload || []
    switch (action.type) {
      case ResourceActionTypes.ADD:
        return {
          ...state,
          [action.resourceType]: [...returningState, ...newResources]
        }
      case ResourceActionTypes.EDIT:
        return {
          ...state,
          [action.resourceType]: state[action.resourceType]?.map((el) => {
            if (el._id === action?.itemId) {
              console.log(action)
              return { ...el, ...action?.payload }
            }
            return el
          })
        }
      case ResourceActionTypes.DELETE:
        return {
          ...state,
          [action.resourceType]: state[action.resourceType]?.filter(
            (el) => el._id !== action?.itemId
          )
        }

      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(resourceReducer, initialState)

  const contextValue = useMemo(
    () => ({
      state,
      dispatch
    }),
    [state, dispatch]
  )

  return (
    <ResourcesContext.Provider value={contextValue}>
      {children}
    </ResourcesContext.Provider>
  )
}

const useResourcesContext = () => useContext(ResourcesContext)

export { ResourcesProvider, useResourcesContext }
