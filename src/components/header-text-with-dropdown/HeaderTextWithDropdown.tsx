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
import MenuItem from '@mui/material/MenuItem'
import { useTranslation } from 'react-i18next'
import { Dispatch, FocusEvent, SetStateAction, useState } from 'react'
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
  isView = false
}: HeaderTextWithDropdownProps) => {
  const { t } = useTranslation()
  const [titleInput, setTitleInput] = useState(sectionData.title)
  const [activeMenu, setActiveMenu] = useState('')
  const { openMenu, renderMenu } = useMenu()

  const onShowHide = () => {
    setIsVisible((isVisible) => !isVisible)
  }

  const handleBlur = (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    isView
      ? ''
      : handleSectionInputChange(sectionData.id, 'title', event.target.value)
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
      onClick: onDeleteSection
    }
  ]

  const sectionMenuItems = sectionActions.map(({ label, onClick, id }) => (
    <MenuItem key={id} onClick={onClick}>
      {label}
    </MenuItem>
  ))

  const showIcon = isVisible ? (
    <KeyboardArrowUpIcon color={ColorEnum.Primary} sx={styles.headerIcon} />
  ) : (
    <KeyboardArrowDownIcon color={ColorEnum.Primary} sx={styles.headerIcon} />
  )
  const showMenu = isView
    ? ''
    : activeMenu === menuTypes.sectionMenu && renderMenu(sectionMenuItems)

  return (
    <Box sx={styles.header}>
      <IconButton onClick={onShowHide} sx={styles.headerIconWrapper}>
        {showIcon}
      </IconButton>
      <AppTextField
        InputLabelProps={styles.titleLabel}
        InputProps={styles.titleInput}
        fullWidth
        inputProps={styles.input(isView)}
        label={titleInput ? '' : t('course.courseSection.moduleTitle')}
        onBlur={(event) => handleBlur(event)}
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
      {showMenu}
    </Box>
  )
}

export default HeaderTextWithDropdown
