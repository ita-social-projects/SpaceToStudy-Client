import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useReducer
} from 'react'
import {
  StepContextAction,
  StepData,
  StepsEnum,
  UserGeneralInfo
} from '~/types'

interface StepProviderProps {
  children: ReactNode
  initialValues: UserGeneralInfo
}

interface StepContextOutput {
  stepData: StepData
  handleSubjects: (subjects: StepData['subjects']) => void
  handlePhoto: (photo: StepData['photo']) => void
  handleLanguage: (language: StepData['language']) => void
  handleGeneralInfo: (generalInfo: StepData['generalInfo']) => void
}

const StepContext = createContext({} as StepContextOutput)

const reducer = (state: StepData, action: StepContextAction) => {
  switch (action.type) {
    case StepsEnum.SetGeneralInfo:
      return { ...state, generalInfo: action.payload }
    case StepsEnum.SetPhoto:
      return { ...state, photo: action.payload }
    case StepsEnum.SetSubjects:
      return { ...state, subjects: action.payload }
    case StepsEnum.SetLanguage:
      return { ...state, language: action.payload }
    default:
      return state
  }
}

const StepProvider = ({ children, initialValues }: StepProviderProps) => {
  const [state, dispatch] = useReducer(reducer, {
    generalInfo: {
      data: initialValues,
      errors: {}
    },
    language: null,
    subjects: [],
    photo: []
  } as StepData)

  const handleSubjects = useCallback((subjects: StepData['subjects']) => {
    dispatch({ type: StepsEnum.SetSubjects, payload: subjects })
  }, [])

  const handlePhoto = useCallback((photo: StepData['photo']) => {
    dispatch({ type: StepsEnum.SetPhoto, payload: photo })
  }, [])

  const handleLanguage = useCallback((language: StepData['language']) => {
    dispatch({ type: StepsEnum.SetLanguage, payload: language })
  }, [])

  const handleGeneralInfo = useCallback(
    (generalInfo: StepData['generalInfo']) => {
      dispatch({
        type: StepsEnum.SetGeneralInfo,
        payload: generalInfo
      })
    },
    []
  )

  return (
    <StepContext.Provider
      value={{
        stepData: state,
        handleSubjects,
        handlePhoto,
        handleLanguage,
        handleGeneralInfo
      }}
    >
      {children}
    </StepContext.Provider>
  )
}

const useStepContext = () => useContext(StepContext)

export { StepProvider, useStepContext }
