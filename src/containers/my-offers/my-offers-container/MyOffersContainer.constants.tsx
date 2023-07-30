import StatusChip from '~/components/status-chip/StatusChip'
import SubjectLevelChips from '~/components/subject-level-chips/SubjectLevelChips'

import {
  AdditionalPropsInterface,
  Offer,
  RemoveColumnRules,
  TableColumn
} from '~/types'
import { getFormattedDate } from '~/utils/helper-functions'

export const columns: TableColumn<Offer>[] = [
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
    calculatedCellValue: (item: Offer, { t }: AdditionalPropsInterface) =>
      `${item.price} ${t('common.uah')}`
  },
  {
    label: 'myOffersPage.tableHeaders.updated',
    field: 'updatedAt',
    calculatedCellValue: (item: Offer) =>
      getFormattedDate({ date: item.updatedAt })
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
