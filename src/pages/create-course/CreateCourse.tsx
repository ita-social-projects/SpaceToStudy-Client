import { useCallback, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AxiosResponse } from 'axios'
import Box from '@mui/material/Box'
import AddIcon from '@mui/icons-material/Add'

import { useAppSelector, useAppDispatch } from '~/hooks/use-redux'
import useForm from '~/hooks/use-form'
import useAxios from '~/hooks/use-axios'
import { userService } from '~/services/user-service'
import { CourseService } from '~/services/course-service'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import CourseSectionsList from '~/containers/course-sections-list/CourseSectionsList'
import CourseToolbar from '~/containers/my-courses/course-toolbar/CourseToolbar'
import AppButton from '~/components/app-button/AppButton'
import Loader from '~/components/loader/Loader'

import { getErrorMessage } from '~/utils/error-with-message'
import {
  ButtonTypeEnum,
  ButtonVariantEnum,
  SizeEnum,
  CourseForm,
  ComponentEnum,
  CourseSection,
  Course,
  ErrorResponse,
  CourseResource,
  UserResponse,
  UserRole
} from '~/types'
import { authRoutes } from '~/router/constants/authRoutes'
import { snackbarVariants } from '~/constants'
import {
  sectionInitialData,
  initialValues,
  defaultResponse,
  validations
} from '~/pages/create-course/CreateCourse.constants'
import { styles } from '~/pages/create-course/CreateCourse.styles'
import { openAlert } from '~/redux/features/snackbarSlice'
import { getErrorKey } from '~/utils/get-error-key'

const CreateCourse = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { userId, userRole } = useAppSelector((state) => state.appMain)

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

  const getUserData = useCallback(
    () => userService.getUserById(userId, userRole as UserRole),
    [userId, userRole]
  )

  const { loading: userLoading, response: user } =
    useAxios<UserResponse | null>({
      service: getUserData,
      defaultResponse: null
    })

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
    return CourseService.editCourse(data, id)
  }

  const { fetchData: fetchEditCourse } = useAxios<null, CourseForm>({
    service: editCourse,
    fetchOnMount: false,
    defaultResponse: null,
    onResponse,
    onResponseError
  })

  const {
    data,
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

  const setSectionsItems = (value: CourseSection[]) => {
    handleNonInputValueChange('sections', value)
  }

  const handleSectionResourcesOrder = (
    id: string,
    resources: CourseResource[]
  ) => {
    const sectionToEdit = data.sections.find((section) => section.id === id)
    if (sectionToEdit) {
      const orderedResources = resources.map((resource) => resource._id)
      sectionToEdit.order = orderedResources
    }
  }

  const handleSectionInputChange = (
    id: string,
    field: keyof CourseSection,
    value: string
  ) => {
    const sectionToEdit = data.sections.find((section) => section.id === id)
    sectionToEdit && Object.defineProperty(sectionToEdit, field, { value })
  }

  const handleSectionNonInputChange = (
    id: string,
    field: keyof CourseSection,
    value: CourseResource[]
  ) => {
    const sectionToEdit = data.sections.find((section) => section.id === id)
    sectionToEdit && Object.defineProperty(sectionToEdit, field, { value })
    setSectionsItems(data.sections)
  }

  const createNewSection = () => {
    const newSectionData = { ...sectionInitialData }
    newSectionData.id = Date.now().toString()
    setSectionsItems([...data.sections, newSectionData])
  }

  if (data.sections.length === 0) {
    createNewSection()
  }

  const getCourse = (id?: string): Promise<AxiosResponse> => {
    return CourseService.getCourse(id)
  }

  const handleCourseResponse = (course: CourseForm) => {
    course.sections.forEach((item) => {
      if (item._id) {
        item.id = item._id
      }
    })
    for (const key in data) {
      const validKey = key as keyof CourseForm
      handleNonInputValueChange(validKey, course[validKey])
    }
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

  if (getCourseLoading || userLoading) {
    return <Loader pageLoad />
  }

  return (
    <PageWrapper>
      <Box component={ComponentEnum.Form} onSubmit={handleSubmit}>
        <CourseToolbar
          data={data}
          errors={errors}
          handleBlur={handleBlur}
          handleInputChange={handleInputChange}
          handleNonInputValueChange={handleNonInputValueChange}
          user={user}
        />
        <CourseSectionsList
          handleSectionInputChange={handleSectionInputChange}
          handleSectionNonInputChange={handleSectionNonInputChange}
          handleSectionResourcesOrder={handleSectionResourcesOrder}
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
