import { ResourceAvailabilityStatusEnum } from '~/types'
import i18n from 'i18next'

export const selectionFields = [
  {
    value: ResourceAvailabilityStatusEnum.Open,
    title: i18n.t('cooperationDetailsPage.resourceSelection.open')
  },
  {
    value: ResourceAvailabilityStatusEnum.OpenFrom,
    title: i18n.t('cooperationDetailsPage.resourceSelection.openFrom')
  },
  {
    value: ResourceAvailabilityStatusEnum.Closed,
    title: i18n.t('cooperationDetailsPage.resourceSelection.closed')
  }
]
