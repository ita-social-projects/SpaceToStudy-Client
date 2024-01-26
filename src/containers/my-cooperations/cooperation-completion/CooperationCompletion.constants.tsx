import { TFunction } from 'i18next'
import { CooperationMaterialsAccessEnum } from '~/types'

export const cooperationAccessValues = (t: TFunction) => [
  {
    title: t('cooperationsPage.cooperationDetails.noAccess'),
    value: CooperationMaterialsAccessEnum.NoAccess
  },
  {
    title: `1 ${t('cooperationsPage.cooperationDetails.monthAccess')}`,
    value: CooperationMaterialsAccessEnum.OneMonthAccess
  },
  {
    title: `3 ${t('cooperationsPage.cooperationDetails.monthAccess')}`,
    value: CooperationMaterialsAccessEnum.ThreeMonthsAccess
  },
  {
    title: `6 ${t('cooperationsPage.cooperationDetails.monthAccess')}`,
    value: CooperationMaterialsAccessEnum.SixMonthsAccess
  },
  {
    title: `1 ${t('cooperationsPage.cooperationDetails.yearAccess')}`,
    value: CooperationMaterialsAccessEnum.OneYearAccess
  },
  {
    title: t('cooperationsPage.cooperationDetails.permanentAccess'),
    value: CooperationMaterialsAccessEnum.PermanentAccess
  }
]
