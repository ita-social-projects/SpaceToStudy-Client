import { FC } from 'react'
import Chip from '~scss-components/chip/Chip'

import { StatusEnum } from '~/types'
import { statusColors } from '~/components/status-chip/StatusChip.styles'

interface StatusChipProps {
  status: StatusEnum
}

const StatusChip: FC<StatusChipProps> = ({ status }) => {
  return (
    <Chip color={statusColors[status]} label={status} size='sm' type='state' />
  )
}

export default StatusChip
