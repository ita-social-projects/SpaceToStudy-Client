import Typography from '@mui/material/Typography'
import AppChip from '~/components/app-chip/AppChip'

import { styles } from '~/components/status-chip/StatusChip.styles'
import { ComponentEnum } from '~/types'

const StatusChip = ({ status, sx }) => {
  const stylesByStatus = styles(status)
  return (
    <AppChip
      labelSx={stylesByStatus.label}
      sx={{ ...stylesByStatus.root, ...sx }}
    >
      <Typography component={ComponentEnum.Span} sx={stylesByStatus.dot} />
      <Typography component={ComponentEnum.Span} sx={stylesByStatus.status}>
        {status}
      </Typography>
    </AppChip>
  )
}

export default StatusChip
