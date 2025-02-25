import Chip from '@mui/material/Chip/Chip'
import TimerOutlined from '@mui/icons-material/TimerOutlined'

import useTimer from '~/hooks/use-timer'

import styles from '~/containers/quiz/timer/Timer.styles'

type TimerProps = {
  initialTime: number
  onTimeEnd?: () => void
}

const Timer: React.FC<TimerProps> = ({ initialTime, onTimeEnd }) => {
  const { time, isTimeRunningOut } = useTimer({ initialTime, onTimeEnd })

  return (
    <Chip
      color={isTimeRunningOut ? 'error' : 'success'}
      icon={
        <TimerOutlined
          sx={isTimeRunningOut ? styles.errorTimer : styles.successTimer}
        />
      }
      label={time}
      size='medium'
      sx={{
        ...styles.chip,
        ...(isTimeRunningOut ? styles.errorChip : styles.successChip),
        '& .MuiChip-label': {
          ...styles.label,
          ...(isTimeRunningOut ? styles.errorLabel : styles.successLabel)
        }
      }}
      variant='outlined'
    />
  )
}

export default Timer
