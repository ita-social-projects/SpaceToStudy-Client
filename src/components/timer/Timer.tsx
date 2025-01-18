import Chip from '@mui/material/Chip/Chip'
import TimerOutlined from '@mui/icons-material/TimerOutlined'

import { theme } from '~/styles/app-theme/custom-mui.styles'

type TimerProps = {
  label: string
  isTimeEnds: boolean
}

export const Timer = ({ label, isTimeEnds }: TimerProps) => {
  return (
    <Chip
      color={isTimeEnds ? 'error' : 'success'}
      icon={
        <TimerOutlined
          sx={{
            fill: isTimeEnds ? 'rgba(205, 54, 54, 1)' : 'rgba(44, 124, 50, 1)'
          }}
        />
      }
      label={label}
      size='medium'
      sx={{
        marginTop: theme.spacing(2),
        backgroundColor: isTimeEnds
          ? 'rgba(250, 238, 238, 1)'
          : 'rgba(226, 242, 220, 1)',
        borderWidth: '1px',
        borderRadius: '12px',
        borderColor: isTimeEnds
          ? 'rgba(205, 54, 54, 1)'
          : 'rgba(87, 154, 64, 1)',
        gap: '8px',
        padding: '6px 8px',
        '& .MuiChip-label': {
          color: isTimeEnds ? 'rgba(82, 22, 22, 1)' : 'rgba(44, 77, 32, 1)',
          fontWeight: 500,
          fontSize: '18px',
          lineHeight: '24px',
          textAlign: 'center'
        }
      }}
      variant='outlined'
    />
  )
}
