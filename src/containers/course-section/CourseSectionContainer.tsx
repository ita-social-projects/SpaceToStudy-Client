import { useState, ChangeEvent, FC, Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { MenuItem } from '@mui/material'
import Box from '@mui/material/Box'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import AddIcon from '@mui/icons-material/Add'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import AppTextField from '~/components/app-text-field/AppTextField'
import AppButton from '~/components/app-button/AppButton'

import useMenu from '~/hooks/use-menu'

import { styles } from '~/containers/course-section/CourseSectionContainer.styles'
import { menuTypes } from '~/containers/course-section/CourseSectionContainer.constants'
import {
  TextFieldVariantEnum,
  SizeEnum,
  ColorEnum,
  ButtonVariantEnum,
  CourseSection
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

  const [activeMenu, setActiveMenu] = useState<string>('')
  const [isVisible, setIsVisible] = useState<boolean>(true)
  const [titleInput, setTitleInput] = useState<string>(sectionData.title)
  const [descriptionInput, setDescriptionInput] = useState(
    sectionData.description
  )

  const onShowHide = () => {
    setIsVisible((isVisible) => !isVisible)
  }

  const onAction = (actionFunc: openModalFunc) => {
    actionFunc()
  }

  const onTitleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleInput(event.target.value)
  }

  const onDescriptionInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescriptionInput(event.target.value)
  }

  const onDeleteSection = () => {
    setSectionsItems((prev) => {
      return prev.filter((item) => item.id !== sectionData.id)
    })
  }

  const sectionActions = [
    {
      id: 1,
      label: <Box>{t('course.courseSection.sectionMenu.deleteSection')}</Box>,
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
        <Box>{t('course.courseSection.resourcesMenu.lessonMenuItem')}</Box>
      ),
      func: closeMenu
    },
    {
      id: 2,
      label: <Box>{t('course.courseSection.resourcesMenu.quizMenuItem')}</Box>,
      func: closeMenu
    },
    {
      id: 3,
      label: (
        <Box>{t('course.courseSection.resourcesMenu.attachmentMenuItem')}</Box>
      ),
      func: closeMenu
    }
  ]

  const resourcesMenuItems = addResourceActions.map(({ label, func, id }) => (
    <MenuItem key={id} onClick={() => onAction(func)} sx={styles.menuItem}>
      {label}
    </MenuItem>
  ))

  return (
    <Box sx={styles.root}>
      <Box sx={styles.dragIconWrapper}>
        <DragIndicatorIcon sx={styles.dragIcon} />
      </Box>
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
