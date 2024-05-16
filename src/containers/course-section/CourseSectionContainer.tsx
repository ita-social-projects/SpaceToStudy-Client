import { useState, FC, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { MenuItem } from '@mui/material'
import Box from '@mui/material/Box'
import AddIcon from '@mui/icons-material/Add'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import HeaderTextWithDropdown from '~/components/header-text-with-dropdown/HeaderTextWithDropdown'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppButton from '~/components/app-button/AppButton'
import ResourcesList from '~/containers/course-section/resources-list/ResourcesList'
import AddResources from '~/containers/add-resources/AddResources'
import { ResourceService } from '~/services/resource-service'
import useMenu from '~/hooks/use-menu'
import { useModalContext } from '~/context/modal-context'
import {
  menuTypes,
  resourceNavigationMap,
  resourcesData
} from '~/containers/course-section/CourseSectionContainer.constants'
import {
  columns as attachmentColumns,
  removeColumnRules as removeAttachmentColumnRules
} from '~/containers/add-resources/AddAttachments.constants'
import {
  columns as lessonColumns,
  removeColumnRules as removeLessonColumnRules
} from '~/containers/add-resources/AddLessons.constants'
import {
  columns as quizColumns,
  removeColumnRules as removeQuizColumnRules
} from '~/containers/add-resources/AddQuizzes.constants'
import {
  TextFieldVariantEnum,
  SizeEnum,
  ButtonVariantEnum,
  CourseSection,
  Lesson,
  Quiz,
  Attachment,
  ResourcesTabsEnum as ResourcesTypes,
  CourseResources,
  CourseSectionHandlers,
  UpdateAttachmentParams
} from '~/types'
import { styles } from '~/containers/course-section/CourseSectionContainer.styles'
import { createUrlPath } from '~/utils/helper-functions'
import { authRoutes } from '~/router/constants/authRoutes'
import { useAppDispatch } from '~/hooks/use-redux'
import { setIsNewActivity } from '~/redux/features/cooperationsSlice'
import EditAttachmentModal from '~/containers/my-resources/edit-attachment-modal/EditAttachmentModal'

import useAxios from '~/hooks/use-axios'

interface SectionProps extends CourseSectionHandlers {
  sectionData: CourseSection
  sections: CourseSection[]
}

type openModalFunc = () => void

const CourseSectionContainer: FC<SectionProps> = ({
  sectionData,
  sections,
  setSectionsItems,
  handleSectionInputChange,
  handleSectionNonInputChange,
  handleSectionResourcesOrder
}) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { openMenu, renderMenu, closeMenu } = useMenu()
  const { openModal, closeModal } = useModalContext()

  const [descriptionInput, setDescriptionInput] = useState<string>(
    sectionData.description
  )
  const [activeMenu, setActiveMenu] = useState<string>('')
  const [isVisible, setIsVisible] = useState<boolean>(true)
  const [resources, setResources] = useState<CourseResources[]>([])

  const getAllResourcesItems = useCallback((): CourseResources[] => {
    return [
      ...sectionData.lessons,
      ...sectionData.quizzes,
      ...sectionData.attachments
    ]
  }, [sectionData.lessons, sectionData.quizzes, sectionData.attachments])

  const updateResources = useCallback(
    (
      prevResources: CourseResources[],
      allResourcesItems: CourseResources[],
      displayOrder: string[]
    ) => {
      return prevResources
        .filter((prevResource) =>
          allResourcesItems.some(
            (currentResource) => currentResource._id === prevResource._id
          )
        )
        .map((prevResource) => ({
          ...prevResource,
          order: displayOrder.indexOf(prevResource._id)
        }))
        .sort((a, b) => a.order - b.order)
    },
    []
  )

  const addNewResources = useCallback(
    (
      updatedResourcesItems: CourseResources[],
      allResourcesItems: CourseResources[],
      displayOrder: string[]
    ): CourseResources[] => {
      return [
        ...updatedResourcesItems,
        ...allResourcesItems
          .filter(
            (currentResource) =>
              !updatedResourcesItems.some(
                (prevResource) => prevResource._id === currentResource._id
              )
          )
          .map((newResource) => ({
            ...newResource,
            order: displayOrder.indexOf(newResource._id)
          }))
      ]
    },
    []
  )

  useEffect(() => {
    setResources((prevResources) => {
      const allResourcesItems = getAllResourcesItems()
      const displayOrder = sectionData.order
      const updatedResourcesItems = updateResources(
        prevResources,
        allResourcesItems,
        displayOrder
      )

      return addNewResources(
        updatedResourcesItems,
        allResourcesItems,
        displayOrder
      )
    })
  }, [getAllResourcesItems, updateResources, addNewResources, sectionData])

  useEffect(() => {
    if (handleSectionResourcesOrder && sectionData.order) {
      handleSectionResourcesOrder(sectionData.id, resources)
    }
  }, [
    resources,
    sectionData.id,
    handleSectionResourcesOrder,
    sectionData.order
  ])

  const deleteResource = (resource: CourseResources) => {
    if (resource.resourceType === ResourcesTypes.Lessons) {
      const newLessons = sectionData.lessons.filter(
        (item) => item._id !== resource._id
      )
      handleSectionNonInputChange(
        sectionData.id,
        resource.resourceType,
        newLessons
      )
    } else if (resource.resourceType === ResourcesTypes.Quizzes) {
      const newQuizzes = sectionData.quizzes.filter(
        (item) => item._id !== resource._id
      )
      handleSectionNonInputChange(
        sectionData.id,
        resource.resourceType,
        newQuizzes
      )
    } else if (resource.resourceType === ResourcesTypes.Attachments) {
      const newAttachments = sectionData.attachments.filter(
        (item) => item._id !== resource._id
      )
      handleSectionNonInputChange(
        sectionData.id,
        resource.resourceType,
        newAttachments
      )
    }
  }

  const handleEditAttachment = (params?: UpdateAttachmentParams) =>
    ResourceService.updateAttachment(params)

  const { fetchData: updateData } = useAxios({
    service: handleEditAttachment,
    fetchOnMount: false,
    onResponse: (attachment: Attachment) => {
      setResources((prev) =>
        prev.map((resource) => {
          if (resource._id === attachment._id) {
            return { ...resource, ...attachment }
          }
          return resource
        })
      )
    }
  })

  const editResource = (resource: CourseResources) => {
    const resourceType = resource.resourceType

    if (!resourceType) return

    if (resourceType === ResourcesTypes.Attachments) {
      openModal({
        component: (
          <EditAttachmentModal
            attachment={resource as Attachment}
            closeModal={closeModal}
            updateAttachment={updateData}
          />
        )
      })
    } else {
      const navigationFiled = resourceNavigationMap[
        resourceType
      ] as keyof typeof authRoutes.myResources

      window
        .open(
          createUrlPath(
            authRoutes.myResources[navigationFiled].path,
            resource._id
          ),
          '_blank'
        )
        ?.focus()
    }
  }

  const onAction = (actionFunc: openModalFunc) => {
    closeMenu()
    actionFunc()
  }

  const onDeleteSection = () => {
    dispatch(setIsNewActivity(false))
    setSectionsItems(sections.filter((item) => item.id !== sectionData.id))
  }

  const handleAddResources = <T extends CourseResources>(
    newResources: T[],
    type: ResourcesTypes
  ) => {
    handleSectionNonInputChange(
      sectionData.id,
      type as keyof CourseSection,
      newResources
    )
  }

  const handleOpenAddLessonsModal = () => {
    openModal({
      component: (
        <AddResources<Lesson>
          columns={lessonColumns}
          onAddResources={(resources) =>
            handleAddResources(resources, ResourcesTypes.Lessons)
          }
          removeColumnRules={removeLessonColumnRules}
          requestService={ResourceService.getUsersLessons}
          resourceType={resourcesData.lessons.resource}
          resources={sectionData.lessons}
        />
      )
    })
  }

  const handleOpenAddQuizzesModal = () => {
    openModal({
      component: (
        <AddResources<Quiz>
          columns={quizColumns}
          onAddResources={(resources) => {
            handleAddResources(resources, ResourcesTypes.Quizzes)
          }}
          removeColumnRules={removeQuizColumnRules}
          requestService={ResourceService.getQuizzes}
          resourceType={resourcesData.quizzes.resource}
          resources={sectionData.quizzes}
        />
      )
    })
  }

  const handleOpenAddAttachmentsModal = () => {
    openModal({
      component: (
        <AddResources<Attachment>
          columns={attachmentColumns}
          onAddResources={(resources) =>
            handleAddResources(resources, ResourcesTypes.Attachments)
          }
          removeColumnRules={removeAttachmentColumnRules}
          requestService={ResourceService.getAttachments}
          resourceType={resourcesData.attachments.resource}
          resources={sectionData.attachments}
        />
      )
    })
  }

  const addResourceActions = [
    {
      id: 1,
      label: (
        <Box sx={styles.menuItem}>
          <Box sx={styles.menuIcon}>{resourcesData.lessons.icon}</Box>
          {t('course.courseSection.resourcesMenu.lessonMenuItem')}
        </Box>
      ),
      func: handleOpenAddLessonsModal
    },
    {
      id: 2,
      label: (
        <Box sx={styles.menuItem}>
          <Box sx={styles.menuIcon}>{resourcesData.quizzes.icon}</Box>
          {t('course.courseSection.resourcesMenu.quizMenuItem')}
        </Box>
      ),
      func: handleOpenAddQuizzesModal
    },
    {
      id: 3,
      label: (
        <Box sx={styles.menuItem}>
          <Box sx={styles.menuIcon}>{resourcesData.attachments.icon}</Box>
          {t('course.courseSection.resourcesMenu.attachmentMenuItem')}
        </Box>
      ),
      func: handleOpenAddAttachmentsModal
    }
  ]

  const resourcesMenuItems = addResourceActions.map(({ label, func, id }) => (
    <MenuItem key={id} onClick={() => onAction(func)}>
      {label}
    </MenuItem>
  ))

  return (
    <Box sx={styles.root}>
      <HeaderTextWithDropdown
        handleSectionInputChange={handleSectionInputChange}
        isVisible={isVisible}
        onDeleteSection={onDeleteSection}
        sectionData={sectionData}
        setIsVisible={setIsVisible}
      />
      {isVisible && (
        <Box>
          <AppTextField
            InputLabelProps={styles.descriptionLabel}
            InputProps={styles.descriptionInput}
            fullWidth
            inputProps={styles.input}
            label={
              descriptionInput
                ? ''
                : t('course.courseSection.defaultNewDescription')
            }
            onBlur={(event) =>
              handleSectionInputChange(
                sectionData.id,
                'description',
                event.target.value
              )
            }
            onChange={(event) => setDescriptionInput(event.target.value)}
            value={descriptionInput}
            variant={TextFieldVariantEnum.Standard}
          />
          <ResourcesList
            deleteResource={deleteResource}
            editResource={editResource}
            items={resources}
            setResources={setResources}
          />
          <AppButton
            endIcon={<KeyboardArrowDownIcon fontSize={SizeEnum.Small} />}
            onClick={(event) => {
              setActiveMenu(menuTypes.resourcesMenu)
              openMenu(event)
            }}
            size={SizeEnum.Large}
            startIcon={<AddIcon fontSize={SizeEnum.Small} />}
            variant={ButtonVariantEnum.Contained}
          >
            {t('course.courseSection.addResourceBtn')}
          </AppButton>
          {activeMenu === menuTypes.resourcesMenu &&
            renderMenu(resourcesMenuItems)}
        </Box>
      )}
    </Box>
  )
}

export default CourseSectionContainer
