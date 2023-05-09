import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormHelperText from '@mui/material/FormHelperText'
import Typography from '@mui/material/Typography'
import useBreakpoints from '~/hooks/use-breakpoints'

import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import { useStepContext } from '~/context/step-context'
import useSubjectsNames from '~/hooks/use-subjects-names'
import useCategoriesNames from '~/hooks/use-categories-names'
import AppChipList from '~/components/app-chips-list/AppChipList'

const SubjectsStep = ({ stepLabel, btnsBox }) => {
  const { t } = useTranslation()
  const { isDesktop, isMobile } = useBreakpoints()
  const { stepData, handleStepData } = useStepContext()
  const subjectData = stepData[stepLabel]

  const [subjects, setSubjects] = useState({
    category: null,
    subject: null,
    categoryId: null
  })
  const [subjectError, setSubjectError] = useState('')
  const { response: categoriesNamesItems } = useCategoriesNames()
  const { response: subjectsNamesItems } = useSubjectsNames({
    category: subjects.categoryId
  })

  subjects.categoryId = useMemo(() => {
    const category = categoriesNamesItems.find(
      (el) => el.name === subjects.category
    )
    const result = !category ? '' : category._id

    return result
  }, [subjects.category, categoriesNamesItems])

  const imageBlock = (
    <Box sx={styles.imgContainer}>
      <Box component='img' src={img} sx={styles.img} />
    </Box>
  )

  const onChangeCategory = (_, value) => {
    setSubjects(
      (prev) => prev.category !== value && { category: value, subject: null }
    )
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

    const isSameLesson = subjectData.some(
      (lesson) => lesson.subject === subject && lesson.category === category
    )
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
    const newItems = subjectData.filter(({ subject }) => subject !== item)
    handleStepData(stepLabel, newItems)
  }

  const listOfItems = subjectData.map((item) => item.subject)
  const categoryOptions = categoriesNamesItems.map((el) => el.name)
  const subjectOptions = subjectsNamesItems.map((el) => el.name)

  return (
    <Box sx={styles.container}>
      {isDesktop && imageBlock}
      <Box sx={styles.rigthBox}>
        <Box sx={styles.contentBox}>
          <Typography mb='20px'>{t('becomeTutor.categories.title')}</Typography>
          {isMobile && imageBlock}
          <AppAutoComplete
            onChange={onChangeCategory}
            options={categoryOptions}
            sx={{ mb: '20px' }}
            textFieldProps={{
              id: t('becomeTutor.categories.mainSubjectsLabel'),
              label: t('becomeTutor.categories.mainSubjectsLabel')
            }}
            type='text'
            value={subjects.category}
          />
          <AppAutoComplete
            disabled={!subjects.category}
            onChange={onChangeSubject}
            options={subjectOptions}
            sx={{ mb: '20px' }}
            textFieldProps={{
              id: t('becomeTutor.categories.subjectLabel'),
              label: t('becomeTutor.categories.subjectLabel')
            }}
            type='text'
            value={subjects.subject}
          />
          <Button
            data-testid='add-subject'
            fullWidth
            onClick={addSubject}
            sx={{ bgcolor: 'primary.50' }}
          >
            <Typography variant='button'>
              {t('becomeTutor.categories.btnText')}
            </Typography>
          </Button>
          <FormHelperText
            data-testid='error-subject'
            error={!!subjectError}
            sx={{ textAlign: 'center' }}
          >
            {subjectError || ' '}
          </FormHelperText>
          <AppChipList
            defaultQuantity={2}
            handleChipDelete={handleChipDelete}
            items={listOfItems}
          />
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default SubjectsStep
