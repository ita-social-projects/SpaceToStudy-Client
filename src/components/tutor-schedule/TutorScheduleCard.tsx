import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import AvatarIcon from '../avatar-icon/AvatarIcon'
import MessageIcon from '@mui/icons-material/Message'
import { styles } from './TutorScheduleCard.styles'
import { ITutorScheduleItem } from './types'

function TutorScheduleCard({ item }: Readonly<{ item: ITutorScheduleItem }>) {
  const { t } = useTranslation()

  const formattedTime = item.time
    .split(' ')
    .map((part) => {
      const translatedDay = t(`common.daysOfWeek.${part.toLowerCase()}`, part)
      return translatedDay !== part ? translatedDay : part
    })
    .join(' ')

  return (
    <Box sx={styles.cardContainer}>
      <AvatarIcon
        firstName={item.firstName}
        lastName={item.lastName}
        sx={styles.avatar}
      />
      <Box sx={styles.mainInfoContainer}>
        <Typography sx={styles.time}>{formattedTime}</Typography>
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
          {item.price} {t('common.uah')}
          <Typography component='span'>/{t('common.hour')}</Typography>
        </Typography>
        <MessageIcon />
      </Box>
    </Box>
  )
}
export default TutorScheduleCard
