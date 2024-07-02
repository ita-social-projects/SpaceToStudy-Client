import { FC } from 'react'
import Box from '@mui/material/Box'
import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

import CooperationSectionView from '~/components/cooperation-section-view/CooperationSectionView'
import { useAppSelector } from '~/hooks/use-redux'
import { cooperationsSelector } from '~/redux/features/cooperationsSlice'

import { styles } from '~/containers/cooperation-details/cooperetion-activities-view/CooperationActivitiesView.style'

interface CooperationActivitiesViewProps {
  setEditMode: () => void
}

const CooperationActivitiesView: FC<CooperationActivitiesViewProps> = ({
  setEditMode
}) => {
  const { sections } = useAppSelector(cooperationsSelector)

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
