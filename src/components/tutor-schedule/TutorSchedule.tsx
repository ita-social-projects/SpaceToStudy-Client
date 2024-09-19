import { Avatar, Box, Button, Typography } from '@mui/material'
import { styles } from '~/components/tutor-schedule/TutorSchedule.styles'
import { items } from './TutorSchedule.constants'
import MessageIcon from '@mui/icons-material/Message'

function TutorSchedule() {
  return (
    <Box sx={styles.general_container}>
      <Typography sx={styles.section_title}>Your schedule</Typography>
      <Typography sx={styles.section_subtitle}>Upcoming classes</Typography>
      <Box sx={styles.card_wrapper}>
        {items.map((item, index) => (
          <Box key={index} sx={styles.card_container}>
            <Avatar alt='User Photo' sx={styles.avatar}></Avatar>
            <Box sx={styles.main_info_container}>
              <Typography sx={styles.time}>{item.time}</Typography>
              <Typography sx={styles.user_name}>{item.user_name}</Typography>
              <Typography sx={styles.subject}>
                {item.subject}
                {item.chapter}
              </Typography>
            </Box>
            <Box sx={styles.price_and_message}>
              <Typography>
                {item.price} UAH <Typography component='span'>/hour</Typography>
              </Typography>
              <MessageIcon />
            </Box>
          </Box>
        ))}
      </Box>
      <Button sx={styles.btn} variant='text'>
        All scheduled classes
      </Button>
    </Box>
  )
}

export default TutorSchedule
