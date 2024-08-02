import { FC, Dispatch, SetStateAction } from 'react'

import Box from '@mui/material/Box'
import EditIcon from '@mui/icons-material/Edit'
import { IconButton } from '@mui/material'

import CooperationSectionView from '~/components/cooperation-section-view/CooperationSectionView'
import { styles } from '~/containers/cooperation-details/cooperation-activities-view/CooperationActivitiesView.style'

import {
  cooperationsSelector,
  setIsAddedClicked
} from '~/redux/features/cooperationsSlice'

import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'

interface CooperationActivitiesViewProps {
  setEditMode: Dispatch<SetStateAction<boolean>>
}

const CooperationActivitiesView: FC<CooperationActivitiesViewProps> = ({
  setEditMode
}) => {
  const { sections } = useAppSelector(cooperationsSelector)
  const dispatch = useAppDispatch()

  const onEdit = () => {
    setEditMode(true)
    dispatch(setIsAddedClicked(false))
  }

  return (
    <Box sx={styles.root}>
      {sections.map((item) => (
        <CooperationSectionView id={item._id} item={item} key={item._id} />
      ))}
      <Box sx={styles.editContainer}>
        <IconButton
          data-testid='iconButton'
          onClick={onEdit}
          sx={styles.editButton}
        >
          <EditIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default CooperationActivitiesView
