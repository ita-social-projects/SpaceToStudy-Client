import Box from '@mui/material/Box'
import StatusChip from '~/components/status-chip/StatusChip'
import AppChip from '~/components/app-chip/AppChip'
import { getFormatedDate } from '~/utils/helper-functions'
import { Cooperation } from '~/types'
import { styles } from '~/containers/my-cooperations/cooperations-container/CooperationContainer.styles'

export const columns = [
  {
    label: 'cooperationsPage.tableHeaders.name',
    field: 'name',
    calculatedCellValue: (item: Cooperation) =>
      `${item.user.firstName} ${item.user.lastName}`
  },
  {
    label: 'cooperationsPage.tableHeaders.title',
    calculatedCellValue: (item: Cooperation) => item.offer.title
  },
  {
    label: 'cooperationsPage.tableHeaders.subject',
    calculatedCellValue: (item: Cooperation) => (
      <Box sx={styles.chips}>
        <AppChip labelSx={styles.chip}>{item.offer.subject.name}</AppChip>
        <AppChip labelSx={styles.chip}>{item.proficiencyLevel}</AppChip>
      </Box>
    )
  },
  {
    label: 'cooperationsPage.tableHeaders.price',
    field: 'price',
    calculatedCellValue: (item: Cooperation) => `${item.price} UAH`
  },
  {
    label: 'cooperationsPage.tableHeaders.updated',
    field: 'updatedAt',
    calculatedCellValue: (item: Cooperation) => getFormatedDate(item.updatedAt)
  },
  {
    label: 'cooperationsPage.tableHeaders.status',
    calculatedCellValue: (item: Cooperation) => (
      <StatusChip status={item.status} />
    )
  }
]

export const removeColumnRules = {
  tablet: [
    'cooperationsPage.tableHeaders.updated',
    'cooperationsPage.tableHeaders.title'
  ]
}
