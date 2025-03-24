import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import Box from '@mui/material/Box'
import AddIcon from '@mui/icons-material/Add'

import Loader from '~/components/loader/Loader'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import Button from '~scss-components/button/Button'
import CourseSectionsList from '~/containers/course-sections-list/CourseSectionsList'
import CourseToolbar from '~/containers/my-courses/course-toolbar/CourseToolbar'

import { userService } from '~/services/user-service'
import { CourseService } from '~/services/course-service'
import { authRoutes } from '~/router/constants/authRoutes'

import { styles } from '~/pages/create-course/CreateCourse.styles'
import {
  initialValues,
  validations
} from '~/pages/create-course/CreateCourse.constants'
import { snackbarVariants } from '~/constants'
import {
  ButtonTypeEnum,
  SizeEnum,
  ComponentEnum,
  type UserRole,
  type Course,
  type CourseForm,
  type CourseSection,
  type CourseResource,
  type Resource,
  type ResourceEvent,
  type ResourceEventHandler,
  type SectionEvent,
  type SectionEventHandler
} from '~/types'

import useForm from '~/hooks/use-form'
import useQuery from '~/hooks/use-query'
import useMutation from '~/hooks/use-mutation'
import useSnackbarAlert from '~/hooks/use-snackbar-alert'
import { useAppSelector } from '~/hooks/use-redux'

import {
  sectionHandlers,
  resourceHandlers,
  addNewSection
} from '~/pages/create-course/CreateCourse.handlers'

const CreateCourse: React.FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { id = '' } = useParams()
  const { userId, userRole } = useAppSelector((state) => state.appMain)
  const { handleAlert, handleErrorAlert } = useSnackbarAlert()

  const getUserData = useCallback(() => {
    return userService.getUserByIdWithBaseService(userId, userRole as UserRole)
  }, [userId, userRole])

  const { data: user = null, isLoading: userLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: getUserData,
    options: {
      staleTime: Infinity
    }
  })

  const handleResponse = () => {
    handleAlert({
      severity: snackbarVariants.success,
      message: id
        ? 'myCoursesPage.newCourse.successEditedCourse'
        : 'myCoursesPage.newCourse.successAddedCourse'
    })
    navigate(authRoutes.myCourses.root.path)
  }

  const addCourse = useCallback(
    (data: CourseForm) => CourseService.addCourseQuery(data),
    []
  )

  const { mutate: createCourse } = useMutation({
    queryKey: ['courses'],
    mutationFn: addCourse,
    onSuccess: handleResponse,
    onError: handleErrorAlert
  })

  const editCourse = useCallback(
    (data: CourseForm) => {
      return CourseService.editCourseQuery(id, data)
    },
    [id]
  )

  const { mutate: updateCourse } = useMutation({
    queryKeys: [['course', id], ['courses']],
    mutationFn: editCourse,
    onSuccess: handleResponse,
    onError: handleErrorAlert
  })

  const {
    data: courseData,
    handleInputChange,
    handleNonInputValueChange,
    handleBlur,
    handleSubmit,
    handleDataChange,
    errors
  } = useForm<CourseForm>({
    initialValues,
    validations,
    onSubmit: (data) => {
      if (!data) return
      id ? updateCourse(data) : createCourse(data)
    },
    submitWithData: true
  })

  const { sections } = courseData

  const setSectionsData = useCallback(
    (sections: CourseSection[]) => {
      handleNonInputValueChange('sections', sections)
    },
    [handleNonInputValueChange]
  )

  const handleSectionChange = useCallback(
    (
      id: string,
      field: keyof CourseSection,
      value: string | CourseResource[] | Resource[]
    ) => {
      const newSections = sections.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      )
      setSectionsData(newSections)
    },
    [sections, setSectionsData]
  )

  const sectionEventHandler = useCallback(
    (event: SectionEvent) => {
      ;(sectionHandlers[event.type] as SectionEventHandler)(
        {
          sections,
          setSectionsData,
          handleSectionChange
        },
        event
      )
    },
    [sections, setSectionsData, handleSectionChange]
  )

  const resourceEventHandler = useCallback(
    (event: ResourceEvent) => {
      ;(resourceHandlers[event.type] as ResourceEventHandler)(
        {
          sections,
          setSectionsData,
          handleSectionChange
        },
        event
      )
    },
    [sections, setSectionsData, handleSectionChange]
  )

  const handleCourseResponse = useCallback(
    (course: Course) => {
      course.sections.forEach((section) => {
        section.id = section._id ?? section.id

        section.resources?.forEach((resource) => {
          resource.resource.id ||= crypto.randomUUID()
        })
      })

      handleDataChange(course)
    },
    [handleDataChange]
  )

  const getCourse = useCallback(() => {
    return CourseService.getCourseQuery(id)
  }, [id])

  const {
    isLoading: getCourseLoading,
    data: course,
    error: courseError
  } = useQuery({
    queryKey: ['course', id],
    queryFn: getCourse,
    options: {
      staleTime: Infinity,
      enabled: Boolean(id)
    }
  })

  useEffect(() => {
    if (id && course) {
      handleCourseResponse(course)
    }
  }, [id, course, handleCourseResponse])

  useEffect(() => {
    if (courseError) {
      handleErrorAlert(courseError)
    }
  }, [courseError, handleErrorAlert])

  if (sections.length === 0) {
    addNewSection({ sections, setSectionsData, handleSectionChange })
  }

  if (getCourseLoading || userLoading) {
    return <Loader pageLoad />
  }

  return (
    <PageWrapper>
      <Box component={ComponentEnum.Form} onSubmit={handleSubmit}>
        <CourseToolbar
          data={courseData}
          errors={errors}
          handleBlur={handleBlur}
          handleInputChange={handleInputChange}
          handleNonInputValueChange={handleNonInputValueChange}
          user={user}
        />
        <CourseSectionsList
          handleSectionInputChange={handleSectionChange}
          items={sections}
          resourceEventHandler={resourceEventHandler}
          sectionEventHandler={sectionEventHandler}
        />
        <Box sx={styles.functionalButton}>
          <Button
            onClick={() =>
              addNewSection({ sections, setSectionsData, handleSectionChange })
            }
            size='md'
            startIcon={<AddIcon fontSize={SizeEnum.Small} />}
            variant='tonal'
          >
            {t('course.addSectionBtn')}
          </Button>
        </Box>
        <Box sx={styles.buttons}>
          <Button
            onClick={() => navigate(authRoutes.myCourses.root.path)}
            variant='tonal'
          >
            {t('common.cancel')}
          </Button>
          <Button type={ButtonTypeEnum.Submit}>{t('common.save')}</Button>
        </Box>
      </Box>
    </PageWrapper>
  )
}

export default CreateCourse
