import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'

import styles from '~/containers/quiz/points/Points.styles'

type PointsProps = {
  points: number
  totalPoints: number
  title: string
}

const Points = ({ points, totalPoints, title }: PointsProps) => {
  return (
    <Box sx={styles.root}>
      <Typography sx={styles.title}>{title}</Typography>
      <Chip label={`${points}/${totalPoints}`} size='small' sx={styles.chip} />
    </Box>
  )
}

export default Points
