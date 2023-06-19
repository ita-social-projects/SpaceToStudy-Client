import { alpha } from '@mui/material/styles'
import palette from '~/styles/app-theme/app.pallete'
import { StatusEnum } from '~/types'

const statusColors = {
  pending: palette.basic.blue,
  active: palette.success[600],
  closed: palette.primary[400],
  'need action': palette.error[600]
}

export const styles = (status: StatusEnum) => ({
  root: {
    backgroundColor: alpha(statusColors[status], 0.2),
    py: 0,
    border: '1px solid',
    borderColor: statusColors[status],
    cursor: 'inherit'
  },
  label: { display: 'flex', gap: '5px', alignItems: 'center' },
  dot: {
    backgroundColor: statusColors[status],
    width: '6px',
    height: '6px',
    borderRadius: '50%'
  },
  status: {
    typography: 'overline',
    lineHeight: '14px',
    color: statusColors[status]
  }
})
