import { ResourceAvailabilityStatus } from '~/types'

export const selectionFields = [
  {
    value: ResourceAvailabilityStatus.open,
    title: 'Open'
  },
  {
    value: ResourceAvailabilityStatus.openFrom,
    title: 'Open from'
  },
  {
    value: ResourceAvailabilityStatus.closed,
    title: 'Closed'
  }
]
