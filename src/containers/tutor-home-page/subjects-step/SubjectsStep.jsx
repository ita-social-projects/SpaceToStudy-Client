import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormHelperText from '@mui/material/FormHelperText'
import Typography from '@mui/material/Typography'
import useBreakpoints from '~/hooks/use-breakpoints'

import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import { categoriesMock, languagesMock } from './constants'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import { useStepContext } from '~/context/step-context'
import AppChipList from '~/components/app-chips-list/AppChipList'

const SubjectsStep = ({ stepLabel, btnsBox }) => {
  const { t } = useTranslation()
  const { isDesktop, isMobile } = useBreakpoints()
  const { stepData, handleStepData } = useStepContext()
  const subjectData = stepData[stepLabel]

  const [subjects, setSubjects] = useState({ category: null, subject: null })
  const [subjectError, setSubjectError] = useState('')

  const imageBlock = (<Box sx={ styles.imgContainer  }>
    <Box component='img' src={ img } sx={ styles.img } />
  </Box>)

  const onChangeCategory = (_, value) => {
    setSubjects((prev) => prev.category !== value && { category: value, subject: null })
  }

  const onChangeSubject = (_, value) => {
    setSubjects((prev) => ({ category: prev.category, subject: value }))
    subjectError && setSubjectError('')
  }

  const addSubject = () => {
    if (!subjects.subject || !subjects.category) {
      setSubjectError(t('becomeTutor.categories.emptyFields'))
      return
    }

    const { subject, category } = subjects

    const isSameLesson = subjectData.some((lesson) => lesson.subject === subject && lesson.category === category)
    if (isSameLesson) {
      setSubjectError(t('becomeTutor.categories.sameSubject'))
      return
    } else {
      setSubjectError('')
    }

    const newSubject = { category: category, subject: subject }
    handleStepData(stepLabel, [...subjectData, newSubject])
  }

  const handleChipDelete = (item) => {
    const newItems = subjectData.filter((subject) => subject.name !== item)
    handleStepData(stepLabel, newItems)
  }

  const listOfItems = subjectData.map((item) => item.subject)
  const categoriesMockOptions = categoriesMock.map((item) => item.name)
  const languagesMockOptions = languagesMock.map((item) => item.name)
  
  return (
    <Box sx={ styles.container }>
      { isDesktop && imageBlock }
      <Box sx={ styles.rigthBox }>
        <Box>
          <Typography mb='20px'>
            { t('becomeTutor.categories.title') }
          </Typography>
          { isMobile && imageBlock }
          <AppAutoComplete
            fieldValue={ subjects.category }
            id={ t('becomeTutor.categories.mainSubjectsLabel') }
            label={ t('becomeTutor.categories.mainSubjectsLabel') }
            onChange={ onChangeCategory }
            options={ categoriesMockOptions }
            sx={ { mb: '20px' } }
            type='text'
          />
          <AppAutoComplete
            disabled={ !subjects.category }
            fieldValue={ subjects.subject }
            id={ t('becomeTutor.categories.subjectLabel') }
            label={ t('becomeTutor.categories.subjectLabel') }
            onChange={ onChangeSubject }
            options={ languagesMockOptions }
            sx={ { mb: '20px' } }
            type='text'
          />
          <Button
            data-testid='add-subject' fullWidth onClick={ addSubject }
            sx={ { bgcolor: 'primary.50' } }
          >
            <Typography variant='button'>
              { t('becomeTutor.categories.btnText') }
            </Typography>
          </Button>
          <FormHelperText data-testid='error-subject' error={ !!subjectError } sx={ { textAlign: 'center' } }>
            { subjectError || ' ' }
          </FormHelperText>
          <AppChipList defaultQuantity={ 2 } handleChipDelete={ handleChipDelete } items={ listOfItems } />
        </Box>
        { btnsBox }
      </Box>
    </Box>
  )
}

export default SubjectsStep
