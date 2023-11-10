import {
  useState,
  ChangeEvent,
  FC,
  Dispatch,
  SetStateAction,
  useEffect
} from 'react'
import { useTranslation } from 'react-i18next'
import { MenuItem } from '@mui/material'
import Box from '@mui/material/Box'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import AddIcon from '@mui/icons-material/Add'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import SvgIcon from '@mui/material/SvgIcon'

import AppTextField from '~/components/app-text-field/AppTextField'
import AppButton from '~/components/app-button/AppButton'
import ResourcesList from '~/containers/course-section/resources-list/ResourcesList'
import AddResources from '../add-resources/AddResources'

import { ResourceService } from '~/services/resource-service'
import { quizService } from '~/services/quiz-service'

import useMenu from '~/hooks/use-menu'
import { useModalContext } from '~/context/modal-context'

import { styles } from '~/containers/course-section/CourseSectionContainer.styles'

import {
  menuTypes,
  resourcesData
} from '~/containers/course-section/CourseSectionContainer.constants'
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

interface SectionProps {
  sectionData: CourseSection
  setSectionsItems: Dispatch<SetStateAction<CourseSection[]>>
}

type openModalFunc = () => void

const CourseSectionContainer: FC<SectionProps> = ({
  sectionData,
  setSectionsItems
}) => {
  const { t } = useTranslation()
  const { openMenu, renderMenu, closeMenu } = useMenu()
  const { openModal } = useModalContext()

  const [activeMenu, setActiveMenu] = useState<string>('')
  const [isVisible, setIsVisible] = useState<boolean>(true)
  const [titleInput, setTitleInput] = useState<string>(sectionData.title)
  const [descriptionInput, setDescriptionInput] = useState(
    sectionData.description
  )
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [resources, setResources] = useState<CourseResources[]>([])
  const [itemToDelete, setItemToDelete] = useState<CourseResources | null>(null)

  useEffect(() => {
    setResources((prevResources) => {
      const allResourcesItems = [...lessons, ...quizzes, ...attachments]
      const updatedResourcesItems = prevResources.filter((item1) =>
        allResourcesItems.some((item2) => item2._id === item1._id)
      )
      for (const item2 of allResourcesItems) {
        if (!updatedResourcesItems.some((item1) => item1._id === item2._id)) {
          updatedResourcesItems.push(item2)
        }
      }
      return updatedResourcesItems
    })
  }, [lessons, quizzes, attachments])

  useEffect(() => {
    if (itemToDelete?.resourceType === ResourcesTypes.Lessons) {
      setLessons((prevLessons) =>
        prevLessons.filter((item) => item._id !== itemToDelete._id)
      )
    } else if (itemToDelete?.resourceType === ResourcesTypes.Quizzes) {
      setQuizzes((prevQuizzes) =>
        prevQuizzes.filter((item) => item._id !== itemToDelete._id)
      )
    } else if (itemToDelete?.resourceType === ResourcesTypes.Attachments) {
      setAttachments((prevAttachments) =>
        prevAttachments.filter((item) => item._id !== itemToDelete._id)
      )
    }
  }, [itemToDelete])

  const onShowHide = () => {
    setIsVisible((isVisible) => !isVisible)
  }

  const onAction = (actionFunc: openModalFunc) => {
    closeMenu()
    actionFunc()
  }

  const onDeleteSection = () => {
    setTitleInput('')
    setDescriptionInput('')
    setResources([])
    closeMenu()
    setSectionsItems((prev) =>
      prev.filter((item) => item.id !== sectionData.id)
    )
  }

  const onTitleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleInput(event.target.value)
  }

  const onDescriptionInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescriptionInput(event.target.value)
  }

  const handleAddResources = <T extends CourseResources>(
    resources: T[],
    setResourcesFunc: Dispatch<SetStateAction<T[]>>,
    type: ResourcesTypes
  ) => {
    setResourcesFunc(
      resources.map((resource) => ({
        ...resource,
        resourceType: type
      }))
    )
  }

  const handleOpenAddLessonsModal = () => {
    openModal({
      component: (
        <AddResources<Lesson>
          onAddResources={(resources) =>
            handleAddResources(resources, setLessons, ResourcesTypes.Lessons)
          }
          requestService={ResourceService.getUsersLessons}
          resourceType={resourcesData.lesson.resource}
          resources={lessons}
        />
      )
    })
  }

  const handleOpenAddQuizzesModal = () => {
    openModal({
      component: (
        <AddResources<Quiz>
          onAddResources={(resources) =>
            handleAddResources(resources, setQuizzes, ResourcesTypes.Quizzes)
          }
          requestService={quizService.getQuizzes}
          resourceType={resourcesData.quiz.resource}
          resources={quizzes}
        />
      )
    })
  }

  const handleOpenAddAttachmentsModal = () => {
    openModal({
      component: (
        <AddResources<Attachment>
          onAddResources={(resources) =>
            handleAddResources(
              resources,
              setAttachments,
              ResourcesTypes.Attachments
            )
          }
          requestService={ResourceService.getAttachments}
          resourceType={resourcesData.attachment.resource}
          resources={attachments}
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
          <SvgIcon
            color='primary'
            component={resourcesData.lesson.icon}
            sx={styles.menuIcon}
          />
          {t('course.courseSection.resourcesMenu.lessonMenuItem')}
        </Box>
      ),
      func: handleOpenAddLessonsModal
    },
    {
      id: 2,
      label: (
        <Box sx={styles.menuItem}>
          <SvgIcon
            color='primary'
            component={resourcesData.quiz.icon}
            sx={styles.menuIcon}
          />
          {t('course.courseSection.resourcesMenu.quizMenuItem')}
        </Box>
      ),
      func: handleOpenAddQuizzesModal
    },
    {
      id: 3,
      label: (
        <Box sx={styles.menuItem}>
          <SvgIcon
            color='primary'
            component={resourcesData.attachment.icon}
            sx={styles.menuIcon}
          />
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
          label={titleInput ? '' : t('course.courseSection.defaultNewTitle')}
          onChange={onTitleInputChange}
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
            onChange={onDescriptionInputChange}
            value={descriptionInput}
            variant={TextFieldVariantEnum.Standard}
          />
          <ResourcesList
            items={resources}
            setItemToDelete={setItemToDelete}
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
