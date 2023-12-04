import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import AddIcon from '@mui/icons-material/Add'

import useForm from '~/hooks/use-form'
import useAxios from '~/hooks/use-axios'
import { CourseService } from '~/services/course-service'
import { useSnackBarContext } from '~/context/snackbar-context'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import CourseSectionsList from '~/containers/course-sections-list/CourseSectionsList'
import AddCourseBanner from '~/containers/add-course-banner/AddCourseBanner'
import CourseToolbar from '~/containers/my-courses/course-toolbar/CourseToolbar'
import AppButton from '~/components/app-button/AppButton'

import {
  ButtonTypeEnum,
  ButtonVariantEnum,
  SizeEnum,
  CourseForm,
  ComponentEnum,
  CourseSection,
  Course,
  ErrorResponse
} from '~/types'
import { authRoutes } from '~/router/constants/authRoutes'
import { snackbarVariants } from '~/constants'
import {
  sectionInitialData,
  initialValues,
  defaultResponse
} from '~/pages/create-course/CreateCourse.constants'
import { styles } from '~/pages/create-course/CreateCourse.styles'

const CreateCourse = () => {
  const { t } = useTranslation()
  const { setAlert } = useSnackBarContext()
  const navigate = useNavigate()
  const formData = new FormData()

  const onResponseError = (error: ErrorResponse) => {
    setAlert({
      severity: snackbarVariants.error,
      message: error ? `errors.${error.code}` : ''
    })
  }

  const onResponse = () => {
    setAlert({
      severity: snackbarVariants.success,
      message: t('myCoursesPage.newCourse.successAddedCourse')
    })
    navigate(authRoutes.myCourses.root.path)
  }

  const addCourse = useCallback(
    (data?: CourseForm) => CourseService.addCourse(data),
    []
  )

  const { fetchData: fetchAddCourse } = useAxios<Course, CourseForm>({
    service: addCourse,
    fetchOnMount: false,
    defaultResponse,
    onResponse,
    onResponseError
  })

  const { data, handleInputChange, handleNonInputValueChange, handleSubmit } =
    useForm<CourseForm>({
      initialValues,
      onSubmit: fetchAddCourse,
      submitWithData: true
    })

  const setSectionsItems = (value: CourseSection[]) => {
    handleNonInputValueChange('sections', value)
  }

  const createNewSection = () => {
    const newSectionData = { ...sectionInitialData }
    newSectionData.id = Date.now() - data.sections.length
    setSectionsItems([...data.sections, newSectionData])
  }

  if (data.sections.length === 0) {
    createNewSection()
  }

  return (
    <PageWrapper>
      <Box component={ComponentEnum.Form} onSubmit={handleSubmit}>
        <AddCourseBanner formData={formData} />
        <CourseToolbar
          data={data}
          handleInputChange={handleInputChange}
          handleNonInputValueChange={handleNonInputValueChange}
        />
        <CourseSectionsList
          items={data.sections}
          setSectionsItems={setSectionsItems}
        />
        <Box sx={styles.functionalButton}>
          <AppButton
            onClick={createNewSection}
            size={SizeEnum.Medium}
            variant={ButtonVariantEnum.Tonal}
          >
            <AddIcon fontSize={SizeEnum.Small} />
            {t('course.addSectionBtn')}
          </AppButton>
        </Box>
        <Box sx={styles.buttons}>
          <AppButton
            onClick={() => navigate(authRoutes.myCourses.root.path)}
            variant={ButtonVariantEnum.Tonal}
          >
            {t('common.cancel')}
          </AppButton>
          <AppButton type={ButtonTypeEnum.Submit}>{t('common.save')}</AppButton>
        </Box>
      </Box>
    </PageWrapper>
  )
}

export default CreateCourse
