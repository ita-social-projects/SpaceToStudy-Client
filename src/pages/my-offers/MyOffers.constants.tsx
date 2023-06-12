import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'
import StatusChip from '~/components/status-chip/StatusChip'
import AppChip from '~/components/app-chip/AppChip'
import { getFormatedDate } from '~/utils/helper-functions'
import { Offer, SortEnum } from '~/types'
import { defaultResponses } from '~/constants'
import { styles } from '~/containers/my-cooperations/cooperations-container/CooperationContainer.styles'

export const columns = [
  {
    label: 'myOffersPage.tableHeaders.title',
    calculatedCellValue: (item: Offer) => item.title
  },
  {
    label: 'myOffersPage.tableHeaders.subject',
    calculatedCellValue: (item: Offer) => (
      <Box sx={styles.chips}>
        <AppChip labelSx={styles.chip}>{item.subject.name}</AppChip>
        <AppChip labelSx={styles.chip}>{item.proficiencyLevel}</AppChip>
      </Box>
    )
  },
  {
    label: 'myOffersPage.tableHeaders.price',
    field: 'price',
    calculatedCellValue: (item: Offer) => `${item.price} UAH`
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

export const removeColumnRules = {
  tablet: [
    'myOffersPage.tableHeaders.updated',
    'myOffersPage.tableHeaders.status'
  ]
}

export const sortTranslationKeys = [
  { title: 'findOffers.sortTitles.newest', value: 'createdAt desc' },
  { title: 'findOffers.sortTitles.priceAsc', value: 'price asc' },
  { title: 'findOffers.sortTitles.priceDesc', value: 'price desc' }
]

export const initialFilters = {
  search: '',
  status: ''
}

export const initialSort = { order: SortEnum.Desc, orderBy: 'createdAt' }

export const button = {
  label: 'myOffersPage.buttonLabel',
  buttonProps: {
    component: Link as React.ElementType,
    to: ''
  }
}
export const title = 'myOffersPage.title'

export const defaultResponse = { offers: defaultResponses.array, count: 0 }
