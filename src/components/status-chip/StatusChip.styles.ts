import { StatusEnum } from '~/types'
import { type ChipColor } from '~scss-components/chip/Chip'

export const statusColors: Record<StatusEnum, ChipColor> = {
  [StatusEnum.Pending]: 'blue',
  [StatusEnum.Active]: 'green',
  [StatusEnum.Closed]: 'blue-gray',
  [StatusEnum.Draft]: 'blue',
  [StatusEnum.NeedAction]: 'red',
  [StatusEnum.RequestToClose]: 'yellow'
}
