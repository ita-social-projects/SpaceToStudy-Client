import { useState, FC, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { MenuItem } from '@mui/material'
import Box from '@mui/material/Box'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import AddIcon from '@mui/icons-material/Add'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

import AppTextField from '~/components/app-text-field/AppTextField'
import AppButton from '~/components/app-button/AppButton'
import ResourcesList from '~/containers/course-section/resources-list/ResourcesList'
import AddResources from '~/containers/add-resources/AddResources'
import { ResourceService } from '~/services/resource-service'
import useMenu from '~/hooks/use-menu'
import { useModalContext } from '~/context/modal-context'
import {
  menuTypes,
  resourcesData
} from '~/containers/course-section/CourseSectionContainer.constants'
import {
  columns as attachmentColumns,
  removeColumnRules as removeAttachmentColumnRules
} from '~/containers/add-resources/AddAttachments.constants'
import {
  columns as lessonColumns,
  removeColumnRules as removeLessontColumnRules
} from '~/containers/add-resources/AddLessons.constants'
import {
  columns as quizColumns,
  removeColumnRules as removeQuizColumnRules
} from '~/containers/add-resources/AddQuizzes.constants'
import {
  TextFieldVariantEnum,
  SizeEnum,
  ColorEnum,
  ButtonVariantEnum,
  CourseSection,
  Lesson,
  Quiz,
  Attachment,
  ResourcesTabsEnum as ResourcesTypes,
  CourseResources
} from '~/types'
import { styles } from '~/containers/course-section/CourseSectionContainer.styles'

interface SectionProps {
  sectionData: CourseSection
  sections: CourseSection[]
  setSectionsItems: (value: CourseSection[]) => void
  handleSectionInputChange: (
    id: string,
    field: keyof CourseSection,
    value: string
  ) => void
  handleSectionNonInputChange: (
    id: string,
    field: keyof CourseSection,
    value: CourseResources[]
  ) => void
  titleText: string
  handleSectionResourcesOrder?: (
    id: string,
    resources: CourseResources[]
  ) => void
}

type openModalFunc = () => void

const CourseSectionContainer: FC<SectionProps> = ({
  sectionData,
  sections,
  setSectionsItems,
  handleSectionInputChange,
  handleSectionNonInputChange,
  handleSectionResourcesOrder,
  titleText
}) => {
  const { t } = useTranslation()
  const { openMenu, renderMenu, closeMenu } = useMenu()
  const { openModal } = useModalContext()

  const [titleInput, setTitleInput] = useState<string>(sectionData.title)
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

  const onShowHide = () => {
    setIsVisible((isVisible) => !isVisible)
  }

  const onAction = (actionFunc: openModalFunc) => {
    closeMenu()
    actionFunc()
  }

  const onDeleteSection = () => {
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
          removeColumnRules={removeLessontColumnRules}
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

  const sectionActions = [
    {
      id: 1,
      label: (
        <Box sx={styles.deleteIconWrapper}>
          <DeleteOutlineIcon sx={styles.menuIcon} />
          {t('course.courseSection.sectionMenu.deleteSection')}
        </Box>
      ),
      func: onDeleteSection
    }
  ]

  const sectionMenuItems = sectionActions.map(({ label, func, id }) => (
    <MenuItem key={id} onClick={func}>
      {label}
    </MenuItem>
  ))

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
      <Box sx={styles.header}>
        <IconButton onClick={onShowHide} sx={styles.headerIconWrapper}>
          {isVisible ? (
            <KeyboardArrowUpIcon
              color={ColorEnum.Primary}
              sx={styles.headerIcon}
            />
          ) : (
            <KeyboardArrowDownIcon
              color={ColorEnum.Primary}
              sx={styles.headerIcon}
            />
          )}
        </IconButton>
        <AppTextField
          InputLabelProps={styles.titleLabel}
          InputProps={styles.titleInput}
          fullWidth
          inputProps={styles.input}
          label={titleInput ? '' : t(`course.courseSection.${titleText}`)}
          onBlur={(event) =>
            handleSectionInputChange(
              sectionData.id,
              'title',
              event.target.value
            )
          }
          onChange={(event) => setTitleInput(event.target.value)}
          value={titleInput}
          variant={TextFieldVariantEnum.Standard}
        />
        <IconButton
          onClick={(event) => {
            setActiveMenu(menuTypes.sectionMenu)
            openMenu(event)
          }}
        >
          <MoreVertIcon color={ColorEnum.Primary} sx={styles.headerIcon} />
        </IconButton>
        {activeMenu === menuTypes.sectionMenu && renderMenu(sectionMenuItems)}
      </Box>
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
