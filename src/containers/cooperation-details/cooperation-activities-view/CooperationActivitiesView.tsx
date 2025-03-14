import { FC, Dispatch, SetStateAction } from 'react'

import Box from '@mui/material/Box'
import EditIcon from '@mui/icons-material/Edit'

import CooperationSectionView from '~/components/cooperation-section-view/CooperationSectionView'
import { styles } from '~/containers/cooperation-details/cooperation-activities-view/CooperationActivitiesView.style'
import { IconButton } from '~/design-system/components/icon-button/IconButton'

import { cooperationsSelector } from '~/redux/features/cooperationsSlice'

import { UserRoleEnum } from '~/types'
import { useAppSelector } from '~/hooks/use-redux'
import AppProgressBarLine from '~/components/app-progress-bar-line/AppProgressBarLine'

interface CooperationActivitiesViewProps {
  setEditMode: Dispatch<SetStateAction<boolean>>
  progress: number
}

const CooperationActivitiesView: FC<CooperationActivitiesViewProps> = ({
  setEditMode,
  progress
}) => {
  const { sections } = useAppSelector(cooperationsSelector)
  const { userRole } = useAppSelector((state) => state.appMain)
  const isTutor = userRole === UserRoleEnum.Tutor
  const onEdit = () => {
    setEditMode(true)
  }

  return (
    <Box sx={styles.root}>
      <Box>
        <AppProgressBarLine
          isCooperationActivities
          userRole=''
          value={progress}
        />
      </Box>
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
