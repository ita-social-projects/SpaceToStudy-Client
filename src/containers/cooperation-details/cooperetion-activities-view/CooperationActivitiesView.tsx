import { FC, Dispatch, SetStateAction } from 'react'
import Box from '@mui/material/Box'
import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

import CooperationSectionView from '~/components/cooperation-section-view/CooperationSectionView'
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'
import {
  cooperationsSelector,
  setIsAddedClicked
} from '~/redux/features/cooperationsSlice'

import { styles } from '~/containers/cooperation-details/cooperetion-activities-view/CooperationActivitiesView.style'
import { CourseSection, UserRoleEnum } from '~/types'

interface CooperationActivitiesViewProps {
  sections: CourseSection[]
  setEditMode: Dispatch<SetStateAction<boolean>>
}

const CooperationActivitiesView: FC<CooperationActivitiesViewProps> = ({
  setEditMode
}) => {
  const { sections } = useAppSelector(cooperationsSelector)
  const dispatch = useAppDispatch()

  const onEdit = () => {
    setEditMode()
    dispatch(setIsAddedClicked(false))
  }

  const { userRole } = useAppSelector((state) => state.appMain)
  const isTutor = userRole === UserRoleEnum.Tutor

  return (
    <Box sx={styles.root}>
      {sections.map((item) => (
        <CooperationSectionView id={item._id} item={item} key={item._id} />
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
