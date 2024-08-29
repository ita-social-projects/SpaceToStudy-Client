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

import { UserRoleEnum } from '~/types'
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'

interface CooperationActivitiesViewProps {
  setEditMode: Dispatch<SetStateAction<boolean>>
}

const CooperationActivitiesView: FC<CooperationActivitiesViewProps> = ({
  setEditMode
}) => {
  const dispatch = useAppDispatch()
  const { sections } = useAppSelector(cooperationsSelector)
  const { userRole } = useAppSelector((state) => state.appMain)
  const isTutor = userRole === UserRoleEnum.Tutor

  const onEdit = () => {
    setEditMode(true)
    dispatch(setIsAddedClicked(false)) // Why is this needed?
  }

  return (
    <Box sx={styles.root}>
      {sections.map((item) => (
        <CooperationSectionView item={item} key={item.id} />
      ))}

      {isTutor && (
        <Box sx={styles.editContainer}>
          <IconButton
            data-testid='iconButton'
            onClick={onEdit}
            sx={styles.editButton}
          >
            <EditIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  )
}

export default CooperationActivitiesView
