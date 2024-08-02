import { useState, useCallback, SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import FormHelperText from '@mui/material/FormHelperText'
import Typography from '@mui/material/Typography'

import AppButton from '~/components/app-button/AppButton'
import AppChipList from '~/components/app-chips-list/AppChipList'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'

import useBreakpoints from '~/hooks/use-breakpoints'

import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import { useStepContext } from '~/context/step-context'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'
import { CategoryNameInterface, SubjectNameInterface } from '~/types'

interface SubjectsStepProps {
  btnsBox: JSX.Element
}

interface SubjectsType {
  category: CategoryNameInterface | null
  subject: SubjectNameInterface | null
}

const SubjectsStep = ({ btnsBox }: SubjectsStepProps) => {
  const { t } = useTranslation()
  const { isLaptopAndAbove, isMobile } = useBreakpoints()
  const { stepData, handleSubjects } = useStepContext()
  const subjectData = stepData.subjects

  const [subjects, setSubjects] = useState<SubjectsType>({
    category: null,
    subject: null
  })

  const [subjectError, setSubjectError] = useState('')
  const [subjectIsFetched, setSubjectIsFetched] = useState(false)

  const fetchSubjectHandler = () => setSubjectIsFetched(true)

  const getSubjectsNames = useCallback(
    () => subjectService.getSubjectsNames(subjects.category?._id ?? null),
    [subjects.category]
  )

  const imageBlock = (
    <Box sx={styles.imgContainer}>
      <Box component='img' src={img} sx={styles.img} />
    </Box>
  )

  const onChangeCategory = (
    _: SyntheticEvent,
    value: CategoryNameInterface | null
  ) => {
    setSubjects((prev) =>
      prev.category?._id !== value?._id
        ? {
            category: value,
            subject: null
          }
        : prev
    )
    setSubjectIsFetched(false)
  }

  const onChangeSubject = (
    _: SyntheticEvent,
    value: SubjectNameInterface | null
  ) => {
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

    handleSubjects([
      ...subjectData,
      { ...subjects.subject, category: subjects.category }
    ])

    !subjectError &&
      setSubjects({
        category: null,
        subject: null
      })
  }

  const handleChipDelete = (item: string) => {
    const newItems = subjectData.filter(({ name }) => name !== item)
    handleSubjects(newItems)
  }
  const listOfItems = subjectData.map((item) => item.name)

  return (
    <Box sx={styles.container}>
      {isLaptopAndAbove && imageBlock}
      <Box sx={styles.rigthBox}>
        <Box sx={styles.contentBox}>
          <Typography mb='20px'>{t('becomeTutor.categories.title')}</Typography>
          {isMobile && imageBlock}
          <AsyncAutocomplete
            fetchOnFocus
            labelField='name'
            onChange={onChangeCategory}
            service={categoryService.getCategoriesNames}
            sx={{ mb: '20px' }}
            textFieldProps={{
              label: t('becomeTutor.categories.mainSubjectsLabel')
            }}
            value={subjects.category?._id ?? null}
            valueField='_id'
          />
          <AsyncAutocomplete
            axiosProps={{ onResponse: fetchSubjectHandler }}
            disabled={!subjects.category}
            fetchCondition={!subjectIsFetched}
            fetchOnFocus
            labelField='name'
            onChange={onChangeSubject}
            service={getSubjectsNames}
            sx={{ mb: '20px' }}
            textFieldProps={{
              label: t('becomeTutor.categories.subjectLabel')
            }}
            value={subjects.subject?._id ?? null}
            valueField='_id'
          />
          <AppButton
            data-testid='add-subject'
            fullWidth
            onClick={addSubject}
            sx={{ bgcolor: 'primary.50' }}
          >
            <Typography variant='button'>
              {t('becomeTutor.categories.btnText')}
            </Typography>
          </AppButton>
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
