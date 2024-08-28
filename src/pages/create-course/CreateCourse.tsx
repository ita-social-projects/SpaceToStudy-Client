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
  sectionInitialData,
  initialValues,
  defaultResponse,
  validations
} from '~/pages/create-course/CreateCourse.constants'
import { snackbarVariants } from '~/constants'
import {
  ButtonTypeEnum,
  ButtonVariantEnum,
  SizeEnum,
  CourseForm,
  ComponentEnum,
  CourseSection,
  Resource,
  Course,
  ErrorResponse,
  CourseResource,
  UserResponse,
  UserRole,
  SectionEventHandler,
  CourseSectionEventType,
  ResourceEventHandler,
  CourseResourceEventType
} from '~/types'

import useForm from '~/hooks/use-form'
import useAxios from '~/hooks/use-axios'
import { useAppSelector, useAppDispatch } from '~/hooks/use-redux'

const CreateCourse = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { id } = useParams()
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
      const newSections = data.sections.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      )
      setSectionsData(newSections)
    },
    [data.sections, setSectionsData]
  )

  const addNewSection = useCallback(() => {
    const newSectionData = { ...sectionInitialData }
    newSectionData.id = uuidv4()
    setSectionsData([...data.sections, newSectionData])
  }, [data.sections, setSectionsData])

  if (data.sections.length === 0) {
    addNewSection()
  }

  const deleteSection = useCallback(
    (sectionId: string) => {
      const sections = data.sections.filter(
        (section) => section.id !== sectionId
      )
      setSectionsData(sections)
    },
    [data.sections, setSectionsData]
  )

  const sectionEventHandler = useCallback<SectionEventHandler>(
    (event) => {
      switch (event.type) {
        case CourseSectionEventType.SectionAdded:
          addNewSection()
          break
        case CourseSectionEventType.SectionRemoved:
          deleteSection(event.sectionId)
          break
        case CourseSectionEventType.SectionsOrderChange:
          setSectionsData(event.sections)
          break
      }
    },
    [addNewSection, deleteSection, setSectionsData]
  )

  const addSectionResources = useCallback(
    ({
      sectionId,
      resources,
      isDuplicate
    }: {
      sectionId: CourseSection['id']
      resources: CourseResource[]
      isDuplicate?: boolean
    }) => {
      const section = data.sections.find((section) => section.id === sectionId)
      if (!section) return

      const newResources = resources
        .filter((resource) => {
          return !section.resources.some(
            (item) => item.resource.id === resource.id && !isDuplicate
          )
        })
        .map((resource) => {
          const { _id, ...newDuplicateResource } = resource
          return {
            resource: {
              ...newDuplicateResource,
              id: uuidv4(),
              ...(isDuplicate ? { _id: '', isDuplicate: true } : { _id })
            },
            resourceType: resource.resourceType
          }
        })

      const newSectionResources = [...section.resources, ...newResources]
      handleSectionChange(sectionId, 'resources', newSectionResources)
    },
    [data.sections, handleSectionChange]
  )

  const updateResource = useCallback(
    ({
      sectionId,
      resourceId,
      resource
    }: {
      sectionId: CourseSection['id']
      resourceId: CourseResource['id']
      resource: Partial<CourseResource>
    }) => {
      const section = data.sections.find((section) => section.id === sectionId)
      if (!section) return

      const currentResource = section.resources.find(
        (item) => item.resource.id === resourceId
      )
      if (!currentResource) return

      const newSectionResources = section.resources.map((item) =>
        item.resource.id === resourceId
          ? { ...currentResource, ...resource }
          : item
      )

      handleSectionChange(sectionId, 'resources', newSectionResources)
    },
    [data.sections, handleSectionChange]
  )

  const deleteResource = useCallback(
    ({
      sectionId,
      resourceId
    }: {
      sectionId: CourseSection['id']
      resourceId: CourseResource['id']
    }) => {
      const section = data.sections.find((section) => section.id === sectionId)
      if (!section) return

      const newSectionResources = section.resources.filter(
        (resource) => resource.resource.id !== resourceId
      )
      handleSectionChange(sectionId, 'resources', newSectionResources)
    },
    [data, handleSectionChange]
  )

  const updateResourcesOrder = useCallback(
    ({
      sectionId,
      resources
    }: {
      sectionId: CourseSection['id']
      resources: CourseResource[]
    }) => {
      const section = data.sections.find((section) => section.id === sectionId)
      if (!section) return

      const newSectionResources = resources.map((resource) => ({
        resource,
        resourceType: resource.resourceType
      }))
      handleSectionChange(sectionId, 'resources', newSectionResources)
    },
    [data.sections, handleSectionChange]
  )

  const resourceEventHandler = useCallback<ResourceEventHandler>(
    (event) => {
      switch (event.type) {
        case CourseResourceEventType.ResourceUpdated:
          updateResource({
            sectionId: event.sectionId,
            resourceId: event.resourceId,
            resource: event.resource
          })
          break
        case CourseResourceEventType.ResourcesOrderChange:
          updateResourcesOrder({
            sectionId: event.sectionId,
            resources: event.resources
          })
          break
        case CourseResourceEventType.AddSectionResources:
          addSectionResources({
            sectionId: event.sectionId,
            resources: event.resources,
            isDuplicate: event.isDuplicate
          })
          break
        case CourseResourceEventType.ResourceRemoved:
          deleteResource({
            sectionId: event.sectionId,
            resourceId: event.resourceId
          })
          break
      }
    },
    [updateResource, updateResourcesOrder, addSectionResources, deleteResource]
  )

  const getCourse = (id?: string): Promise<AxiosResponse> => {
    return CourseService.getCourse(id)
  }

  const handleCourseResponse = (course: CourseForm) => {
    course.sections.forEach((item) => {
      if (item._id) {
        item.id = item._id
      }
    })
    course.sections.forEach((section) => {
      section.resources?.forEach((resource) => {
        resource.resource.id ||= uuidv4()
      })
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
          handleSectionInputChange={handleSectionChange}
          items={data.sections}
          resourceEventHandler={resourceEventHandler}
          sectionEventHandler={sectionEventHandler}
        />
        <Box sx={styles.functionalButton}>
          <AppButton
            onClick={addNewSection}
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
