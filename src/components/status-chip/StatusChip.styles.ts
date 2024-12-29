import { StatusEnum } from '~/types'
import { type ChipColor } from '~scss-components/chip/types'

export const statusColors: Record<StatusEnum, ChipColor> = {
  [StatusEnum.Pending]: 'blue',
  [StatusEnum.Active]: 'green',
  [StatusEnum.Closed]: 'red',
  [StatusEnum.Draft]: 'blue',
  [StatusEnum.NeedAction]: 'red',
  [StatusEnum.RequestToClose]: 'yellow'
}
