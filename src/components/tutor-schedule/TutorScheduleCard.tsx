import { Box, Typography } from '@mui/material'
import AvatarIcon from '../avatar-icon/AvatarIcon'
import MessageIcon from '@mui/icons-material/Message'
import { styles } from './TutorScheduleCard.styles'
import { ITutorScheduleItem } from './types'

function TutorScheduleCard({ item }: Readonly<{ item: ITutorScheduleItem }>) {
  return (
    <Box sx={styles.cardContainer}>
      <AvatarIcon
        firstName={item.firstName}
        lastName={item.lastName}
        sx={styles.avatar}
      />
      <Box sx={styles.mainInfoContainer}>
        <Typography sx={styles.time}>{item.time}</Typography>
        <Typography sx={styles.userName}>
          {item.firstName} {item.lastName}
        </Typography>
        <Typography sx={styles.subject}>
          {item.subject}
          {item.chapter}
        </Typography>
      </Box>
      <Box sx={styles.priceAndMessage}>
        <Typography>
          {item.price} UAH <Typography component='span'>/hour</Typography>
        </Typography>
        <MessageIcon />
      </Box>
    </Box>
  )
}
export default TutorScheduleCard
