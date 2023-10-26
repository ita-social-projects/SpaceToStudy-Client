import { useState } from 'react'
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

import useForm from '~/hooks/use-form'
import { styles } from '~/containers/course-section/CourseSectionContainer.styles'
import {
  TextFieldVariantEnum,
  SizeEnum,
  ColorEnum,
  ButtonVariantEnum,
  CourseSection
} from '~/types'

import {
  AddResourcesMenuItem,
  initialValues,
  validations
} from '~/containers/course-section/CourseSectionContainer.constants'

const CourseSectionContainer = () => {
  const { t } = useTranslation()

  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null)
  const [visible, setVisible] = useState<boolean>(true)

  const { data, errors, handleInputChange } = useForm<CourseSection>({
    initialValues,
    validations
  })

  const onShowHide = () => {
    setVisible((visible) => !visible)
  }

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget)
  }

  const closeMenu = () => setMenuAnchorEl(null)

  const menuListValues: Array<AddResourcesMenuItem> = [
    {
      name: 'Lesson',
      handleClick: closeMenu
    },
    {
      name: 'Quiz',
      handleClick: closeMenu
    },
    {
      name: 'Attachment',
      handleClick: closeMenu
    }
  ]

  return (
    <Box sx={styles.root}>
      <Box sx={styles.dragIconWrapper}>
        <DragIndicatorIcon sx={styles.dragIcon} />
      </Box>
      <Box sx={styles.header}>
        <IconButton onClick={onShowHide} style={styles.headerIconWrapper}>
          {visible ? (
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
          errorMsg={t(errors.title)}
          fullWidth
          inputProps={styles.input}
          label={data.title ? '' : t('course.courseSection.defaultNewTitle')}
          onChange={handleInputChange('title')}
          value={data.title}
          variant={TextFieldVariantEnum.Standard}
        />
        <IconButton>
          <MoreVertIcon color={ColorEnum.Primary} sx={styles.headerIcon} />
        </IconButton>
      </Box>
      {visible && (
        <Box>
          <AppTextField
            InputLabelProps={styles.descriptionLabel}
            InputProps={styles.descriptionInput}
            errorMsg={t(errors.description)}
            fullWidth
            inputProps={styles.input}
            label={
              data.description
                ? ''
                : t('course.courseSection.defaultNewDescription')
            }
            onChange={handleInputChange('description')}
            value={data.description}
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
