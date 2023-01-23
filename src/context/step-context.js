import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { stepLabels } from '~/containers/tutor-home-page/constants'

const StepContext = createContext()

const StepProvider = ({ children }) => {
  const [generalData, setGeneralData] = useState(null)
  const [generalDataErrors, setGeneralDataErrors] = useState({})
  const [subject, setSubject] = useState(null)
  const [subjectErrors, setSubjectErrors] = useState({})
  const [languages, setLanguages] = useState(null)
  const [languagesErrors, setLanguagesErrors] = useState({})
  const [photo, setPhoto] = useState([])
  const [photoErrors, setPhotoErrors] = useState({})
  const [generalLabel, subjectLabel, languagesLabel, photoLabel] = stepLabels

  const stepData = useMemo(
    () => ({
      [generalLabel]: generalData,
      [subjectLabel]: subject,
      [languagesLabel]: languages,
      [photoLabel]: photo
    }),
    [generalData, subject, languages, photo, generalLabel, subjectLabel, languagesLabel, photoLabel]
  )

  const stepErrors = useMemo(
    () => ({
      [generalLabel]: generalDataErrors,
      [subjectLabel]: subjectErrors,
      [languagesLabel]: languagesErrors,
      [photoLabel]: photoErrors
    }),
    [
      generalDataErrors,
      subjectErrors,
      languagesErrors,
      photoErrors,
      generalLabel,
      subjectLabel,
      languagesLabel,
      photoLabel
    ]
  )

  const handleStepErrors = useCallback(
    (stepLabel, errors) => {
      switch (stepLabel) {
      case generalLabel:
        setGeneralDataErrors(errors)
        break
      case subjectLabel:
        setSubjectErrors(errors)
        break
      case languagesLabel:
        setLanguagesErrors(errors)
        break
      case photoLabel:
        setPhotoErrors(errors)
        break
      default:
        return
      }
    },
    [generalLabel, subjectLabel, languagesLabel, photoLabel]
  )

  const handleStepData = useCallback(
    (stepLabel, data) => {
      switch (stepLabel) {
      case generalLabel:
        setGeneralData(data)
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
    <StepContext.Provider value={ { stepData, stepErrors, handleStepData, handleStepErrors } }>
      { children }
    </StepContext.Provider>
  )
}

const useStepContext = () => useContext(StepContext)

export { StepProvider, useStepContext }
