import { FC } from 'react'
import Typography from '@mui/material/Typography'
import { SxProps } from '@mui/material'
import AppChip from '~/components/app-chip/AppChip'

import { ComponentEnum, StatusEnum } from '~/types'
import { styles } from '~/components/status-chip/StatusChip.styles'

interface StatusChipProps {
  status: StatusEnum
  sx?: SxProps
}

const StatusChip: FC<StatusChipProps> = ({ status, sx }) => {
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
