import Chip from '@mui/material/Chip/Chip'
import TimerOutlined from '@mui/icons-material/TimerOutlined'

import useTimer from '~/hooks/use-timer'

import styles from '~/containers/quiz/timer/Timer.styles'

type TimerProps = {
  initialTime: number
  onTimeEnd?: () => void
}

const Timer: React.FC<TimerProps> = ({ initialTime, onTimeEnd }) => {
  const { time, isTimeEnds } = useTimer(initialTime, onTimeEnd)

  return (
    <Chip
      color={isTimeEnds ? 'error' : 'success'}
      icon={
        <TimerOutlined
          sx={isTimeEnds ? styles.errorTimer : styles.successTimer}
        />
      }
      label={time}
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
