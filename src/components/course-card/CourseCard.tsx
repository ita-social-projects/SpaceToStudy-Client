import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SxProps } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Divider from '@mui/material/Divider'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

import SubjectLevelChips from '~/components/subject-level-chips/SubjectLevelChips'

import { styles } from '~/components/course-card/CourseCard.styles'
import useMenu from '~/hooks/use-menu'
import {
  createUrlPath,
  getFormattedDate,
  spliceSx
} from '~/utils/helper-functions'
import { Course, TableActionFunc } from '~/types'
import { authRoutes } from '~/router/constants/authRoutes'

type CourseCardElement =
  | 'card'
  | 'title'
  | 'description'
  | 'chipContainer'
  | 'secondaryText'

interface CourseCardProps {
  course: Course
  deleteCourse?: (id: string) => void
  duplicateCourse?: (id: string) => void
  isSelected?: boolean
  withMenu?: boolean
  sx?: Partial<Record<CourseCardElement, SxProps>>
}

const CourseCard: FC<CourseCardProps> = ({
  course,
  deleteCourse,
  duplicateCourse,
  isSelected = false,
  withMenu = true,
  sx
}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { openMenu, renderMenu, closeMenu } = useMenu()

  const {
    title,
    description,
    category,
    subject,
    proficiencyLevel,
    sections = [{}],
    updatedAt
  } = course

  const date = getFormattedDate({ date: updatedAt })

  const onAction = async (actionFunc: TableActionFunc) => {
    closeMenu()
    await actionFunc(course._id)
  }

  const rowActions = [
    {
      id: 1,
      label: (
        <Box sx={styles.iconWrapper}>
          <EditIcon sx={styles.icon} />
          {` ${t('common.edit')}`}
        </Box>
      ),
      func: () =>
        navigate(
          createUrlPath(authRoutes.myCourses.editCourse.path, course._id)
        )
    },
    {
      id: 2,
      label: (
        <Box sx={styles.iconWrapper}>
          <ContentCopyIcon sx={styles.icon} />
          {` ${t('common.duplicate')}`}
        </Box>
      ),
      func: () => duplicateCourse?.(course._id)
    },
    {
      id: 3,
      label: (
        <Box sx={styles.deleteIconWrapper}>
          <DeleteOutlineIcon sx={styles.deleteIcon} />
          {` ${t('common.delete')}`}
        </Box>
      ),
      func: () => deleteCourse?.(course._id)
    }
  ]

  const menuItems = rowActions.map(({ label, func, id }) => (
    <MenuItem key={id} onClick={() => void onAction(func)}>
      {label}
    </MenuItem>
  ))

  const optionsMenu = (
    <>
      <IconButton onClick={openMenu}>
        <MoreVertIcon />
      </IconButton>
      {renderMenu(menuItems)}
    </>
  )

  return (
    <Box sx={spliceSx(styles.card(isSelected), sx?.card)}>
      <Box>
        <Typography sx={spliceSx(styles.title, sx?.title)}>{title}</Typography>
        <Typography sx={spliceSx(styles.description, sx?.description)}>
          {description}
        </Typography>
        <SubjectLevelChips
          color={category?.appearance.color}
          proficiencyLevel={proficiencyLevel}
          subject={subject?.name}
          sx={spliceSx(styles.chipContainer, sx?.chipContainer)}
        />
        <Typography sx={spliceSx(styles.secondaryText, sx?.secondaryText)}>
          {`${sections.length} ${
            sections.length > 1 ? t('course.sections') : t('course.section')
          }`}
        </Typography>
      </Box>
      <Box>
        <Divider sx={styles.line} />
        <Box sx={styles.dateContainer}>
          <Typography sx={spliceSx(styles.secondaryText, sx?.secondaryText)}>
            {date}
          </Typography>
          {withMenu && optionsMenu}
        </Box>
      </Box>
    </Box>
  )
}

export default CourseCard
