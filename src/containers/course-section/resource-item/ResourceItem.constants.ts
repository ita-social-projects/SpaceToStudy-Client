import i18n from 'i18next'
import { ResourceAvailabilityStatusEnum } from '~/types'

import openIcon from '~/assets/img/cooperation-details/resource-availability/open-icon.svg'
import openFrom from '~/assets/img/cooperation-details/resource-availability/open-from.svg'
import closedIcon from '~/assets/img/cooperation-details/resource-availability/closed-icon.svg'

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

export const availabilityIcons: Record<ResourceAvailabilityStatusEnum, string> =
  {
    [ResourceAvailabilityStatusEnum.Open]: openIcon,
    [ResourceAvailabilityStatusEnum.OpenFrom]: openFrom,
    [ResourceAvailabilityStatusEnum.Closed]: closedIcon
  }
