import Chip from '@mui/material/Chip/Chip'
import TimerOutlined from '@mui/icons-material/TimerOutlined'

import styles from '~/containers/quiz/timer/Timer.styles'

type TimerProps = {
  label: string
  isTimeEnds: boolean
}

const Timer = ({ label, isTimeEnds }: TimerProps) => {
  return (
    <Chip
      color={isTimeEnds ? 'error' : 'success'}
      icon={
        <TimerOutlined
          sx={isTimeEnds ? styles.errorTimer : styles.successTimer}
        />
      }
      label={label}
      size='medium'
      sx={{
        ...styles.chip,
        ...(isTimeEnds ? styles.errorChip : styles.successChip),
        '& .MuiChip-label': {
          ...styles.label,
          ...(isTimeEnds ? styles.errorLabel : styles.successLabel)
        }
      }}
      variant='outlined'
    />
  )
}

export default Timer
