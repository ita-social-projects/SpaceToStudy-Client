import { Box, Button, FormHelperText, Typography } from '@mui/material'
import { styles } from '~/containers/tutor-home-page/subjects/Subjects.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import { useTranslation } from 'react-i18next'
import { categoriesMock, languagesMock } from './constants'
import Autocoplete from '~/components/autocoplete/Autocomplete'
import { useState } from 'react'
import { useStepContext } from '~/context/step-context'
import AppChipList from '~/components/app-chips-list/AppChipList'

const Subjects = ({ stepLabel, btnsBox }) => {
  const { t } = useTranslation()
  const { stepData, handleStepData } = useStepContext()
  const subjectData = stepData[stepLabel]

  const [subjects, setSubjects] = useState({ category: null, subject: null })
  const [subjectError, setSubjectError] = useState('')

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

    const isSameLesson = subjectData.some((lesson) => lesson.name === subject.name && lesson.category === category.name)
    if (isSameLesson) {
      setSubjectError(t('becomeTutor.categories.sameSubject'))
      return
    } else {
      setSubjectError('')
    }

    const newSubject = { category: category.name, name: subject.name }
    handleStepData(stepLabel, [...subjectData, newSubject])
  }

  const handleChipDelete = (item) => {
    const newItems = subjectData.filter((subject) => subject.name !== item)
    handleStepData(stepLabel, newItems)
  }

  const listOfItems = subjectData.map((item) => item.name)

  return (
    <Box sx={ styles.container }>
      <Box sx={ styles.imgContainer }>
        <Box component='img' src={ img } sx={ styles.img } />
      </Box>
      <Box sx={ styles.rigthBox }>
        <Box>
          <Typography mb='30px'>
            { t('becomeTutor.categories.title') }
          </Typography>
          <Autocoplete
            id={ t('becomeTutor.categories.mainSubjectsLabel') }
            label={ t('becomeTutor.categories.mainSubjectsLabel') }
            onChange={ onChangeCategory }
            options={ categoriesMock }
            value={ subjects.category }
          />
          <Autocoplete
            disabled={ !subjects.category }
            id={ t('becomeTutor.categories.subjectLabel') }
            label={ t('becomeTutor.categories.subjectLabel') }
            onChange={ onChangeSubject }
            options={ languagesMock }
            value={ subjects.subject }
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
          <AppChipList defaultQuantity={ 7 } handleChipDelete={ handleChipDelete } items={ listOfItems } />
        </Box>
        { btnsBox }
      </Box>
    </Box>
  )
}

export default Subjects
