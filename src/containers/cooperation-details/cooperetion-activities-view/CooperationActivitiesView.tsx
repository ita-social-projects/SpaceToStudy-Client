import { FC } from 'react'
import Box from '@mui/material/Box'
import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

import CooperationSectionView from '~/components/cooperation-section-view/CooperationSectionView'
import { CourseSection } from '~/types'

import { styles } from '~/containers/cooperation-details/cooperetion-activities-view/CooperationActivitiesView.style'

interface CooperationActivitiesViewProps {
  sections: CourseSection[]
  setEditMode: () => void
}

const CooperationActivitiesView: FC<CooperationActivitiesViewProps> = ({
  sections,
  setEditMode
}) => {
  const onEdit = () => {
    setEditMode()
  }

  return (
    <Box sx={styles.root}>
      {sections.map((item) => (
        <CooperationSectionView id={item._id} item={item} key={item._id} />
      ))}
      <Box sx={styles.editContainer}>
        <IconButton onClick={onEdit} sx={styles.editButton}>
          <EditIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default CooperationActivitiesView
