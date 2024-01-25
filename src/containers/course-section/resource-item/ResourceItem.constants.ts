import { ResourceAvailabilityStatusEnum } from '~/types'
import i18n from 'i18next'

export const selectionFields = [
  {
    value: ResourceAvailabilityStatusEnum.open,
    title: i18n.t('cooperationDetailsPage.resourceSelection.open')
  },
  {
    value: ResourceAvailabilityStatusEnum.openFrom,
    title: i18n.t('cooperationDetailsPage.resourceSelection.openFrom')
  },
  {
    value: ResourceAvailabilityStatusEnum.closed,
    title: i18n.t('cooperationDetailsPage.resourceSelection.closed')
  }
]
