import { Box, Button, FormHelperText, Typography } from '@mui/material'
import { styles } from '~/containers/tutor-home-page/subjects/Subjects.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import { useTranslation } from 'react-i18next'
import { categories, languages } from './constants'
import AppChip from '~/components/app-chips/AppChips'
import Autocoplete from '~/components/autocoplete/Autocomplete'
import { useEffect, useState } from 'react'

const Subjects = ({ data, handleData, btnsBox }) => {
  const { t } = useTranslation()
  const { lessons } = data
  const [category, setCategory] = useState(null)
  const [subject, setSubject] = useState(null)
  const [subjectError, setSubjectError] = useState('')

  useEffect(() => {
    if (!category) {
      setSubject(null)
    }

    if (category || subject) {
      setSubjectError('')
    }
  }, [category, subject])

  const addSubject = () => {
    if (!subject || !category) {
      setSubjectError(t('becomeTutor.categories.emptyFields'))
      return
    }

    const isSameLesson = lessons.some((lesson) => lesson.name === subject.name && lesson.category === category.name)
    if (isSameLesson) {
      setSubjectError(t('becomeTutor.categories.sameSubject'))
      return
    }

    const newLesson = { category: category.name, name: subject.name }

    handleData('lessons', [...lessons, newLesson])
  }

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
            options={ categories }
            setData={ setCategory }
            value={ category }
          />
          <Autocoplete
            disabled={ !category }
            id={ t('becomeTutor.categories.subjectLabel') }
            label={ t('becomeTutor.categories.subjectLabel') }
            options={ languages }
            setData={ setSubject }
            value={ subject }
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
          <AppChip
            defaultQuantity={ 7 } handleData={ handleData } items={ lessons }
            value='lessons'
          />
        </Box>
        { btnsBox }
      </Box>
    </Box>
  )
}

export default Subjects
