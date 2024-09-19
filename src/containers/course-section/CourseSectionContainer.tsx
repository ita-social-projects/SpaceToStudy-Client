import { useState, FC, useMemo, useCallback } from 'react'
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
import EditAttachmentModal from '~/containers/my-resources/edit-attachment-modal/EditAttachmentModal'
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
import { styles } from '~/containers/course-section/CourseSectionContainer.styles'

import {
  TextFieldVariantEnum,
  SizeEnum,
  ButtonVariantEnum,
  CourseSection,
  Lesson,
  Quiz,
  Attachment,
  ResourcesTypesEnum as ResourceType,
  CourseResource,
  CourseSectionHandlers,
  UpdateAttachmentParams,
  CourseResourceEventType,
  CourseSectionEventType,
  ResourceAvailability
} from '~/types'
import { authRoutes } from '~/router/constants/authRoutes'
import { ResourceService } from '~/services/resource-service'
import { createUrlPath } from '~/utils/helper-functions'
import { useModalContext } from '~/context/modal-context'

import useAxios from '~/hooks/use-axios'
import useMenu from '~/hooks/use-menu'

interface SectionProps extends CourseSectionHandlers {
  sectionData: CourseSection
  isCooperation?: boolean
}

type OpenModalFunction = () => void

const CourseSectionContainer: FC<SectionProps> = ({
  sectionData,
  handleSectionInputChange,
  resourceEventHandler,
  sectionEventHandler,
  isCooperation = false
}) => {
  const { t } = useTranslation()
  const { openMenu, renderMenu, closeMenu } = useMenu()
  const { openModal, closeModal } = useModalContext()

  const [activeMenu, setActiveMenu] = useState<string>('')
  const [isVisible, setIsVisible] = useState<boolean>(true)

  const allResources = useMemo(
    () => sectionData.resources.map((item) => item.resource),
    [sectionData.resources]
  )

  const allNonDuplicateResources = useMemo(
    () => allResources.filter((resource) => !resource.isDuplicate),
    [allResources]
  )

  const lessons = useMemo(
    () =>
      allNonDuplicateResources.filter(
        (resource) => resource.resourceType === ResourceType.Lesson
      ) as Lesson[],
    [allNonDuplicateResources]
  )

  const quizzes = useMemo(
    () =>
      allNonDuplicateResources.filter(
        (resource) => resource.resourceType === ResourceType.Quiz
      ) as Quiz[],
    [allNonDuplicateResources]
  )

  const attachments = useMemo(
    () =>
      allNonDuplicateResources.filter(
        (resource) => resource.resourceType === ResourceType.Attachment
      ) as Attachment[],
    [allNonDuplicateResources]
  )

  const handleResourcesSort = useCallback(
    (resources: CourseResource[]) => {
      resourceEventHandler?.({
        type: CourseResourceEventType.ResourcesOrderChange,
        sectionId: sectionData.id,
        resources
      })
    },
    [sectionData, resourceEventHandler]
  )

  const handleResourceAvailabilityChange = useCallback(
    (resource: CourseResource, availability: ResourceAvailability) => {
      resourceEventHandler?.({
        type: CourseResourceEventType.ResourceUpdated,
        sectionId: sectionData.id,
        resourceId: resource.id,
        resource: {
          availability
        }
      })
    },
    [sectionData, resourceEventHandler]
  )

  const deleteResource = (resource: CourseResource) => {
    resourceEventHandler?.({
      type: CourseResourceEventType.ResourceRemoved,
      sectionId: sectionData.id,
      resourceId: resource.id
    })
  }

  const handleEditAttachment = (params?: UpdateAttachmentParams) =>
    ResourceService.updateAttachment(params)

  const { fetchData: updateData } = useAxios({
    service: handleEditAttachment,
    fetchOnMount: false,
    onResponse: (attachment: Attachment) => {
      resourceEventHandler?.({
        type: CourseResourceEventType.ResourceUpdated,
        sectionId: sectionData.id,
        resourceId: attachment._id,
        resource: attachment
      })
    }
  })

  const editResource = (resource: CourseResource) => {
    const resourceType = resource.resourceType

    if (!resourceType) return

    if (resourceType === ResourceType.Attachment) {
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

  const onAction = (actionFunc: OpenModalFunction) => {
    closeMenu()
    actionFunc()
  }

  const onDeleteSection = () => {
    sectionEventHandler?.({
      type: CourseSectionEventType.SectionRemoved,
      sectionId: sectionData.id
    })
  }
  const handleAddResources = <T extends CourseResource>(
    newResources: T[],
    isDuplicate: boolean
  ) => {
    resourceEventHandler?.({
      type: CourseResourceEventType.AddSectionResources,
      sectionId: sectionData.id,
      resources: newResources,
      isDuplicate: isDuplicate
    })
  }

  const handleOpenAddLessonsModal = () => {
    openModal({
      component: (
        <AddResources<Lesson>
          columns={lessonColumns}
          onAddResources={handleAddResources}
          removeColumnRules={removeLessonColumnRules}
          requestService={ResourceService.getUsersLessons}
          resourceTab={resourcesData.lessons.resourceTab}
          resources={lessons}
          showCheckboxWithTooltip
        />
      )
    })
  }

  const handleOpenAddQuizzesModal = () => {
    openModal({
      component: (
        <AddResources<Quiz>
          columns={quizColumns}
          onAddResources={handleAddResources}
          removeColumnRules={removeQuizColumnRules}
          requestService={ResourceService.getQuizzes}
          resourceTab={resourcesData.quizzes.resourceTab}
          resources={quizzes}
          showCheckboxWithTooltip
        />
      )
    })
  }

  const handleOpenAddAttachmentsModal = () => {
    openModal({
      component: (
        <AddResources<Attachment>
          columns={attachmentColumns}
          onAddResources={handleAddResources}
          removeColumnRules={removeAttachmentColumnRules}
          requestService={ResourceService.getAttachments}
          resourceTab={resourcesData.attachments.resourceTab}
          resources={attachments}
          showCheckboxWithTooltip
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
              sectionData.description
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
            onChange={(event) =>
              handleSectionInputChange(
                sectionData.id,
                'description',
                event.target.value
              )
            }
            value={sectionData.description}
            variant={TextFieldVariantEnum.Standard}
          />
          <ResourcesList
            deleteResource={deleteResource}
            editResource={editResource}
            isCooperation={isCooperation}
            items={allResources}
            sortResources={handleResourcesSort}
            updateAvailability={handleResourceAvailabilityChange}
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
