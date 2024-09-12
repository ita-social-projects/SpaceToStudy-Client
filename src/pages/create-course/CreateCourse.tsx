import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { AxiosResponse } from 'axios'
import { v4 as uuidv4 } from 'uuid'

import Box from '@mui/material/Box'
import AddIcon from '@mui/icons-material/Add'

import Loader from '~/components/loader/Loader'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import AppButton from '~/components/app-button/AppButton'
import CourseSectionsList from '~/containers/course-sections-list/CourseSectionsList'
import CourseToolbar from '~/containers/my-courses/course-toolbar/CourseToolbar'

import { userService } from '~/services/user-service'
import { CourseService } from '~/services/course-service'
import { getErrorMessage } from '~/utils/error-with-message'
import { getErrorKey } from '~/utils/get-error-key'
import { authRoutes } from '~/router/constants/authRoutes'
import { openAlert } from '~/redux/features/snackbarSlice'

import { styles } from '~/pages/create-course/CreateCourse.styles'
import {
  initialValues,
  defaultResponse,
  validations
} from '~/pages/create-course/CreateCourse.constants'
import { snackbarVariants } from '~/constants'
import {
  ButtonTypeEnum,
  ButtonVariantEnum,
  SizeEnum,
  UserRole,
  UserResponse,
  ErrorResponse,
  ComponentEnum,
  Course,
  CourseForm,
  CourseSection,
  CourseResource,
  Resource,
  ResourceEvent,
  ResourceEventHandler,
  SectionEvent,
  SectionEventHandler
} from '~/types'

import useForm from '~/hooks/use-form'
import useAxios from '~/hooks/use-axios'
import { useAppSelector, useAppDispatch } from '~/hooks/use-redux'

import {
  sectionHandlers,
  resourceHandlers,
  addNewSection
} from '~/pages/create-course/CreateCourse.handlers'

const CreateCourse = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { id } = useParams()
  const { userId, userRole } = useAppSelector((state) => state.appMain)

  const getUserData = useCallback(
    () => userService.getUserById(userId, userRole as UserRole),
    [userId, userRole]
  )

  const { loading: userLoading, response: user } =
    useAxios<UserResponse | null>({
      service: getUserData,
      defaultResponse: null
    })

  const onResponseError = (error?: ErrorResponse) => {
    const errorKey = getErrorKey(error)

    dispatch(
      openAlert({
        severity: snackbarVariants.error,
        message: error
          ? {
              text: errorKey,
              options: {
                message: getErrorMessage(error.message)
              }
            }
          : errorKey
      })
    )
  }

  const onResponse = () => {
    dispatch(
      openAlert({
        severity: snackbarVariants.success,
        message: id
          ? 'myCoursesPage.newCourse.successEditedCourse'
          : 'myCoursesPage.newCourse.successAddedCourse'
      })
    )
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

  const editCourse = (): Promise<AxiosResponse> => {
    return CourseService.editCourse(courseData, id)
  }

  const { fetchData: fetchEditCourse } = useAxios<null, CourseForm>({
    service: editCourse,
    fetchOnMount: false,
    defaultResponse: null,
    onResponse,
    onResponseError
  })

  const {
    data: courseData,
    handleInputChange,
    handleNonInputValueChange,
    handleBlur,
    handleSubmit,
    errors
  } = useForm<CourseForm>({
    initialValues,
    validations,
    onSubmit: id ? fetchEditCourse : fetchAddCourse,
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

  const handleCourseResponse = (course: CourseForm) => {
    course.sections.forEach((section) => {
      section.id = section._id ?? section.id
      section.resources?.forEach((resource) => {
        resource.resource.id ||= uuidv4()
      })
    })
    Object.keys(courseData).forEach((key) => {
      const validKey = key as keyof CourseForm
      handleNonInputValueChange(validKey, course[validKey])
    })
  }

  const getCourse = (id?: string): Promise<AxiosResponse> => {
    return CourseService.getCourse(id)
  }

  const { loading: getCourseLoading, fetchData: fetchCourseData } = useAxios<
    CourseForm,
    string
  >({
    service: getCourse,
    fetchOnMount: false,
    defaultResponse,
    onResponse: handleCourseResponse,
    onResponseError
  })

  useEffect(() => {
    if (id) {
      void fetchCourseData(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

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
          <AppButton
            onClick={() =>
              addNewSection({ sections, setSectionsData, handleSectionChange })
            }
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
