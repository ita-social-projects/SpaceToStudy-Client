import { Box, Button, Typography } from '@mui/material'
import { styles } from '~/components/tutor-schedule/TutorSchedule.styles'
import TutorScheduleCard from './TutorScheduleCard'
import { ITutorScheduleItem } from './types'

const items: ITutorScheduleItem[] = [
  {
    time: '18:00-19:30 Thu',
    firstName: 'Tomas',
    lastName: 'Wang',
    subject: 'Computer science: ',
    chapter: 'python',
    price: 80
  },

  {
    time: '12:45-14:45 Thu',
    firstName: 'Bella',
    lastName: 'Hadid',
    subject: 'Computer science: ',
    chapter: 'python',
    price: 140
  },

  {
    time: '18:00-19:30 Thu',
    firstName: 'Bella',
    lastName: 'Hadid',
    subject: 'Math: ',
    chapter: 'linear algebra',
    price: 90
  }
]

function TutorSchedule() {
  return (
    <Box sx={styles.generalContainer}>
      <Box sx={styles.textContainer}>
        <Typography sx={styles.sectionTitle}>Your schedule</Typography>
        <Typography sx={styles.sectionSubtitle}>Upcoming classes</Typography>
      </Box>
      <Box sx={styles.cardWrapper}>
        {items.map((item) => (
          <TutorScheduleCard item={item} key={item.lastName} />
        ))}
      </Box>
      <Button sx={styles.btn} variant='text'>
        All scheduled classes
      </Button>
    </Box>
  )
}

export default TutorSchedule
