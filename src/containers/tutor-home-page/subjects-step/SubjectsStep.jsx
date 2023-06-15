import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormHelperText from '@mui/material/FormHelperText'
import Typography from '@mui/material/Typography'
import useBreakpoints from '~/hooks/use-breakpoints'

import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import { useStepContext } from '~/context/step-context'
import AppChipList from '~/components/app-chips-list/AppChipList'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'

const SubjectsStep = ({ stepLabel, btnsBox }) => {
  const { t } = useTranslation()
  const { isDesktop, isMobile } = useBreakpoints()
  const { stepData, handleStepData } = useStepContext()
  const subjectData = stepData[stepLabel]

  const [subjects, setSubjects] = useState({
    category: null,
    subject: null
  })

  const [subjectError, setSubjectError] = useState('')

  const [categoryFetched, setCategoryIsFetched] = useState(false)
  const [subjectFetched, setSubjectIsFetched] = useState(false)

  const getSubjectsNames = useCallback(
    () => subjectService.getSubjectsNames(subjects.category._id),
    [subjects.category]
  )

  const handleCategoryFetch = () => setCategoryIsFetched(true)
  const handleSubjectFetch = () => setSubjectIsFetched(true)

  const imageBlock = (
    <Box sx={styles.imgContainer}>
      <Box component='img' src={img} sx={styles.img} />
    </Box>
  )

  const onChangeCategory = (_, value) => {
    setSubjects(
      (prev) =>
        prev.category?._id !== value?._id && {
          category: value,
          subject: null
        }
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

    const isSameLesson = subjectData.some(
      (lesson) => lesson?._id === subjects.subject?._id
    )

    if (isSameLesson) {
      setSubjectError(t('becomeTutor.categories.sameSubject'))
      return
    } else {
      setSubjectError('')
    }

    handleStepData(stepLabel, [...subjectData, subjects.subject])

    !subjectError &&
      setSubjects({
        category: null,
        subject: null
      })
  }

  const handleChipDelete = (item) => {
    const newItems = subjectData.filter(({ name }) => name !== item)
    handleStepData(stepLabel, newItems)
  }
  const listOfItems = subjectData.map((item) => item.name)

  return (
    <Box sx={styles.container}>
      {isDesktop && imageBlock}
      <Box sx={styles.rigthBox}>
        <Box sx={styles.contentBox}>
          <Typography mb='20px'>{t('becomeTutor.categories.title')}</Typography>
          {isMobile && imageBlock}
          <AsyncAutocomplete
            labelField='name'
            onChange={onChangeCategory}
            onFocus={handleCategoryFetch}
            service={categoryFetched && categoryService.getCategoriesNames}
            sx={{ mb: '20px' }}
            textFieldProps={{
              label: t('becomeTutor.categories.mainSubjectsLabel')
            }}
            value={subjects.category?._id ?? null}
            valueField='_id'
          />
          <AsyncAutocomplete
            disabled={!subjects.category}
            labelField='name'
            onChange={onChangeSubject}
            onFocus={handleSubjectFetch}
            service={subjectFetched && getSubjectsNames}
            sx={{ mb: '20px' }}
            textFieldProps={{
              label: t('becomeTutor.categories.subjectLabel')
            }}
            value={subjects.subject?._id ?? null}
            valueField='_id'
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
