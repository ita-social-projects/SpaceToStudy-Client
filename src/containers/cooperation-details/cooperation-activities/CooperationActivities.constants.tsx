import { ResourcesAvailabilityEnum } from '~/types'

export const cooperationTranslationKeys = [
  {
    title: 'cooperationDetailsPage.select.openAll',
    value: ResourcesAvailabilityEnum.OpenAll
  },
  {
    title: 'cooperationDetailsPage.select.openManually',
    value: ResourcesAvailabilityEnum.OpenManually
  }
]

export const OpenFromError = {
  status: 409,
  code: 'VALIDATION_ERROR',
  message:
    'Cooperation validation failed: OpenFrom: OpenFrom should be with date.'
}
