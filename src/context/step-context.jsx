import { createContext, useCallback, useContext, useState } from 'react'
import { stepLabels } from '~/containers/tutor-home-page/constants'
import { initialValues } from '~/containers/tutor-home-page/constants'

const StepContext = createContext()

const StepProvider = ({ children }) => {
  const [generalData, setGeneralData] = useState({
    data: initialValues,
    errors: {}
  })
  const [subject, setSubject] = useState([])
  const [language, setLanguage] = useState(null)
  const [photo, setPhoto] = useState([])
  const [generalLabel, subjectLabel, languageLabel, photoLabel] = stepLabels

  const stepData = {
    [generalLabel]: generalData,
    [subjectLabel]: subject,
    [languageLabel]: language,
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
        case languageLabel:
          setLanguage(data)
          break
        case photoLabel:
          setPhoto(data)
          break
        default:
          return
      }
    },
    [generalLabel, subjectLabel, languageLabel, photoLabel]
  )

  return (
    <StepContext.Provider value={{ stepData, handleStepData }}>
      {children}
    </StepContext.Provider>
  )
}

const useStepContext = () => useContext(StepContext)

export { StepProvider, useStepContext }
