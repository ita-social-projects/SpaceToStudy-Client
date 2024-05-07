import Box from '@mui/material/Box'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

import AppTextField from '~/components/app-text-field/AppTextField'
import { menuTypes } from '~/containers/course-section/CourseSectionContainer.constants'
import {
  TextFieldVariantEnum,
  ColorEnum,
  CourseSection,
  FormInputValueChange
} from '~/types'
import { MenuItem } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Dispatch, SetStateAction, useState } from 'react'
import useMenu from '~/hooks/use-menu'
import { styles } from '~/components/header-text-with-dropdown/HeaderTextWithDropdown.styles'

interface HeaderTextWithDropdownProps {
  sectionData: CourseSection
  setIsVisible: Dispatch<SetStateAction<boolean>>
  onDeleteSection?: () => void
  handleSectionInputChange?: FormInputValueChange<string, CourseSection>
  isVisible: boolean
  isView?: boolean
}

const HeaderTextWithDropdown = ({
  setIsVisible,
  handleSectionInputChange,
  sectionData,
  onDeleteSection,
  isVisible,
  isView
}: HeaderTextWithDropdownProps) => {
  const { t } = useTranslation()
  const [titleInput, setTitleInput] = useState<string>(sectionData.title)
  const [activeMenu, setActiveMenu] = useState<string>('')
  const { openMenu, renderMenu } = useMenu()

  const onShowHide = () => {
    setIsVisible((isVisible) => !isVisible)
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

  return (
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
        inputProps={styles.input(isView)}
        label={titleInput ? '' : t('course.courseSection.moduleTitle')}
        onBlur={(event) =>
          isView
            ? ''
            : handleSectionInputChange(
                sectionData.id,
                'title',
                event.target.value
              )
        }
        onChange={(event) => setTitleInput(event.target.value)}
        value={titleInput}
        variant={TextFieldVariantEnum.Standard}
      />
      {isView ? (
        ''
      ) : (
        <IconButton
          onClick={(event) => {
            setActiveMenu(menuTypes.sectionMenu)
            openMenu(event)
          }}
        >
          <MoreVertIcon color={ColorEnum.Primary} sx={styles.headerIcon} />
        </IconButton>
      )}
      {isView
        ? ''
        : activeMenu === menuTypes.sectionMenu && renderMenu(sectionMenuItems)}
    </Box>
  )
}

export default HeaderTextWithDropdown
