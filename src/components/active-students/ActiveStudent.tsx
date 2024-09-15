import { Box, Typography } from '@mui/material'

import { createUrlPath } from '~/utils/helper-functions'

import AppCard from '../app-card/AppCard'
import AppChip from '../app-chip/AppChip'
import { styles } from './ActiveStudent.styles'
import AvatarIcon from '../avatar-icon/AvatarIcon'
import { useNavigate } from 'react-router-dom'

interface ActiveStudentProps {
  firstName: string
  lastName: string
  subjectName: string
  cooperationId: string
  photo?: string | null
}

const ActiveStudent: React.FC<ActiveStudentProps> = ({
  firstName,
  lastName,
  subjectName,
  cooperationId,
  photo
}) => {
  const navigate = useNavigate()
  const fullName = `${firstName} ${lastName}`

  const onCardClick = () => {
    navigate(`/my-cooperations/${cooperationId}`)
  }

  return (
    <AppCard
      data-testid='studentCard'
      onClick={onCardClick}
      sx={styles.wrapper}
    >
      <AvatarIcon
        firstName={firstName}
        lastName={lastName}
        photo={
          photo && createUrlPath(import.meta.env.VITE_APP_IMG_USER_URL, photo)
        }
        sx={styles.avatarIcon}
      />
      <Typography noWrap textOverflow={'ellipsis'}>
        {fullName}
      </Typography>
      <AppChip labelSx={styles.chipLabel} sx={styles.chip} labelElementProps={{ component: "div" }}>
        <Box sx={styles.subjectNameWrapper}>
          <Typography>{subjectName}</Typography>
          <Typography sx={styles.dot} />
        </Box>
      </AppChip>
    </AppCard>
  )
}

export default ActiveStudent
