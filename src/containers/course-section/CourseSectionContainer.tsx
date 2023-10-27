import { useState, MouseEvent, FC } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import AddIcon from '@mui/icons-material/Add'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import AppTextField from '~/components/app-text-field/AppTextField'
import AppButton from '~/components/app-button/AppButton'
import AddResourcesMenu from './add-resources-menu/AddResourcesMenu'

import { styles } from '~/containers/course-section/CourseSectionContainer.styles'
import {
  TextFieldVariantEnum,
  SizeEnum,
  ColorEnum,
  ButtonVariantEnum,
  CourseSection
} from '~/types'

import { AddResourcesMenuItem } from '~/containers/course-section/CourseSectionContainer.constants'

interface SectionProps {
  sectionData: CourseSection
}

const CourseSectionContainer: FC<SectionProps> = ({ sectionData }) => {
  const { t } = useTranslation()

  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState<boolean>(true)

  const onShowHide = () => {
    setIsVisible((isVisible) => !isVisible)
  }

  const openMenu = (event: MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget)
  }

  const closeMenu = () => setMenuAnchorEl(null)

  const menuListValues: Array<AddResourcesMenuItem> = [
    {
      name: t('course.courseSection.resourcesMenu.lessonMenuItem'),
      handleClick: closeMenu
    },
    {
      name: t('course.courseSection.resourcesMenu.quizMenuItem'),
      handleClick: closeMenu
    },
    {
      name: t('course.courseSection.resourcesMenu.attachmentMenuItem'),
      handleClick: closeMenu
    }
  ]

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
          label={
            sectionData.title ? '' : t('course.courseSection.defaultNewTitle')
          }
          // onChange={handleInputChange('title')}
          value={sectionData.title}
          variant={TextFieldVariantEnum.Standard}
        />
        <IconButton>
          <MoreVertIcon color={ColorEnum.Primary} sx={styles.headerIcon} />
        </IconButton>
      </Box>
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
            // onChange={handleInputChange('description')}
            value={sectionData.description}
            variant={TextFieldVariantEnum.Standard}
          />
          <AppButton
            endIcon={<KeyboardArrowDownIcon fontSize={SizeEnum.Small} />}
            onClick={openMenu}
            size={SizeEnum.Large}
            startIcon={<AddIcon fontSize={SizeEnum.Small} />}
            variant={ButtonVariantEnum.Contained}
          >
            {t('course.courseSection.addResourceBtn')}
          </AppButton>
          <AddResourcesMenu
            anchorEl={menuAnchorEl}
            menuListValues={menuListValues}
            onClose={closeMenu}
          />
        </Box>
      )}
    </Box>
  )
}

export default CourseSectionContainer
