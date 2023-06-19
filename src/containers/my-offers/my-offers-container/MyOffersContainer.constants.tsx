import { useTranslation } from 'react-i18next'

import StatusChip from '~/components/status-chip/StatusChip'
import SubjectLevelChips from '~/components/subject-level-chips/SubjectLevelChips'

import { getFormatedDate } from '~/utils/helper-functions'
import { Offer, RemoveColumnRules } from '~/types'

const GetPriceCellValue = (item: Offer) => {
  const { t } = useTranslation()
  return `${item.price} ${t('common.uah')}`
}

export const columns = [
  {
    label: 'myOffersPage.tableHeaders.title',
    calculatedCellValue: (item: Offer) => item.title
  },
  {
    label: 'myOffersPage.tableHeaders.subject',
    calculatedCellValue: (item: Offer) => (
      <SubjectLevelChips
        color={item.category.appearance.color}
        proficiencyLevel={item.proficiencyLevel}
        subject={item.subject.name}
      />
    )
  },
  {
    label: 'myOffersPage.tableHeaders.price',
    field: 'price',
    calculatedCellValue: GetPriceCellValue
  },
  {
    label: 'myOffersPage.tableHeaders.updated',
    field: 'updatedAt',
    calculatedCellValue: (item: Offer) => getFormatedDate(item.updatedAt)
  },
  {
    label: 'myOffersPage.tableHeaders.status',
    calculatedCellValue: (item: Offer) => <StatusChip status={item.status} />
  }
]

export const removeColumnRules: RemoveColumnRules<Offer> = {
  tablet: [
    'myOffersPage.tableHeaders.updated',
    'myOffersPage.tableHeaders.status'
  ]
}
