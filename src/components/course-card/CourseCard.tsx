import { FC } from 'react'
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
import { getFormattedDate } from '~/utils/helper-functions'
import { Course, TableActionFunc } from '~/types'
import { useTranslation } from 'react-i18next'

interface CourseCardProps {
  course: Course
  deleteCourse: (id: string) => void
}

const CourseCard: FC<CourseCardProps> = ({ course, deleteCourse }) => {
  const { t } = useTranslation()
  const { openMenu, renderMenu, closeMenu } = useMenu()

  const {
    title,
    description,
    category,
    subject,
    proficiencyLevel,
    sections = [{}],
    createdAt
  } = course

  const date = getFormattedDate({ date: createdAt })

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
      func: () => closeMenu()
    },
    {
      id: 2,
      label: (
        <Box sx={styles.iconWrapper}>
          <ContentCopyIcon sx={styles.icon} />
          {` ${t('common.duplicate')}`}
        </Box>
      ),
      func: () => closeMenu()
    },
    {
      id: 3,
      label: (
        <Box sx={styles.deleteIconWrapper}>
          <DeleteOutlineIcon sx={styles.deleteIcon} />
          {` ${t('common.delete')}`}
        </Box>
      ),
      func: () => deleteCourse(course._id)
    }
  ]

  const menuItems = rowActions.map(({ label, func, id }) => (
    <MenuItem key={id} onClick={() => void onAction(func)}>
      {label}
    </MenuItem>
  ))

  return (
    <Box sx={styles.card}>
      <Box>
        <Typography sx={styles.title}>{title}</Typography>
        <Typography sx={styles.description}>{description}</Typography>
        <SubjectLevelChips
          color={category.appearance.color}
          proficiencyLevel={proficiencyLevel}
          subject={subject.name}
          sx={styles.chipContainer}
        />
        <Typography sx={styles.secondaryText}>
          {`${sections.length} ${
            sections.length > 1 ? t('course.sections') : t('course.section')
          }`}
        </Typography>
      </Box>
      <Box>
        <Divider sx={styles.line} />
        <Box sx={styles.dateContainer}>
          <Typography sx={styles.secondaryText}>{date}</Typography>
          <IconButton onClick={openMenu}>
            <MoreVertIcon />
          </IconButton>
          {renderMenu(menuItems)}
        </Box>
      </Box>
    </Box>
  )
}

export default CourseCard
