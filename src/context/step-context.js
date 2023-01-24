import { createContext, useCallback, useContext, useState } from 'react'
import { stepLabels } from '~/containers/tutor-home-page/constants'

const StepContext = createContext()

const StepProvider = ({ children }) => {
  const [generalData, setGeneralData] = useState({})
  const [subject, setSubject] = useState({})
  const [languages, setLanguages] = useState({})
  const [photo, setPhoto] = useState([])
  const [generalLabel, subjectLabel, languagesLabel, photoLabel] = stepLabels

  const stepData = {
    [generalLabel]: generalData,
    [subjectLabel]: subject,
    [languagesLabel]: languages,
    [photoLabel]: photo
  }

  const handleStepData = useCallback(
    (stepLabel, data, errors) => {
      switch (stepLabel) {
      case generalLabel:
        setGeneralData({ data, errors })
        break
      case subjectLabel:
        setSubject(data)
        break
      case languagesLabel:
        setLanguages(data)
        break
      case photoLabel:
        setPhoto(data)
        break
      default:
        return
      }
    },
    [generalLabel, subjectLabel, languagesLabel, photoLabel]
  )

  return (
    <StepContext.Provider value={ { stepData, handleStepData } }>
      { children }
    </StepContext.Provider>
  )
}

const useStepContext = () => useContext(StepContext)

export { StepProvider, useStepContext }
