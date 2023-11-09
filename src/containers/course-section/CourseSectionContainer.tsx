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
import ListAltIcon from '@mui/icons-material/ListAlt'
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined'
import AttachFileIcon from '@mui/icons-material/AttachFile'

import AppTextField from '~/components/app-text-field/AppTextField'
import AppButton from '~/components/app-button/AppButton'
import AddLessons from '~/containers/add-lessons/AddLessons'
import AddQuizzes from '~/containers/add-quizzes/AddQuizzes'
import AddAttachments from '~/containers/add-attachments/AddAttachments'
import ResourcesList from '~/containers/course-section/resources-list/ResourcesList'

import useMenu from '~/hooks/use-menu'
import { useModalContext } from '~/context/modal-context'

import { styles } from '~/containers/course-section/CourseSectionContainer.styles'

import { menuTypes } from '~/containers/course-section/CourseSectionContainer.constants'
import {
  TextFieldVariantEnum,
  SizeEnum,
  ColorEnum,
  ButtonVariantEnum,
  CourseSection,
  Lesson,
  Quiz,
  Attachment,
  ResourcesTabsEnum as ResourcesTypes
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
  const [resources, setResources] = useState<(Lesson | Attachment | Quiz)[]>([])
  const [itemToDelete, setItemToDelete] = useState<
    Lesson | Attachment | Quiz | null
  >(null)

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
    setSectionsItems((prev) => {
      if (prev.length === 1) {
        setTitleInput('')
        setDescriptionInput('')
        setResources([])
        closeMenu()
      }
      return prev.filter((item) => item.id !== sectionData.id)
    })
  }

  const onTitleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleInput(event.target.value)
  }

  const onDescriptionInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescriptionInput(event.target.value)
  }

  const handleAddLessons = (lessons: Lesson[]) => {
    setLessons(
      lessons.map((lesson) => ({
        ...lesson,
        resourceType: ResourcesTypes.Lessons
      }))
    )
  }

  const handleOpenAddLessonsModal = () => {
    openModal({
      component: (
        <AddLessons lessons={lessons} onAddLessons={handleAddLessons} />
      )
    })
  }

  const handleAddQuizzes = (quizzes: Quiz[]) => {
    setQuizzes(
      quizzes.map((quiz) => ({
        ...quiz,
        resourceType: ResourcesTypes.Quizzes
      }))
    )
  }

  const handleOpenAddQuizzesModal = () => {
    openModal({
      component: (
        <AddQuizzes onAddQuizzes={handleAddQuizzes} quizzes={quizzes} />
      )
    })
  }

  const handleAddAttachments = (attachments: Attachment[]) => {
    setAttachments(
      attachments.map((attachment) => ({
        ...attachment,
        resourceType: ResourcesTypes.Attachments
      }))
    )
  }

  const handleOpenAddAttachmentsModal = () => {
    openModal({
      component: (
        <AddAttachments
          attachments={attachments}
          onAddAttachments={handleAddAttachments}
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
          <ListAltIcon color='primary' sx={styles.menuIcon} />
          {t('course.courseSection.resourcesMenu.lessonMenuItem')}
        </Box>
      ),
      func: handleOpenAddLessonsModal
    },
    {
      id: 2,
      label: (
        <Box sx={styles.menuItem}>
          <NoteAltOutlinedIcon color='primary' sx={styles.menuIcon} />
          {t('course.courseSection.resourcesMenu.quizMenuItem')}
        </Box>
      ),
      func: handleOpenAddQuizzesModal
    },
    {
      id: 3,
      label: (
        <Box sx={styles.menuItem}>
          <AttachFileIcon color='primary' sx={styles.menuIcon} />
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
