import Typography from '@mui/material/Typography'

import { Categories, TableColumn, SortEnum, RemoveColumnRules } from '~/types'
import { getFormattedDate } from '~/utils/helper-functions'

import { styles } from '~/containers/my-resources/categories-container/CategoriesContainer.style'

export const columns: TableColumn<Categories>[] = [
  {
    label: 'myResourcesPage.categories.title',
    field: 'title',
    calculatedCellValue: (item: Categories) => {
      return <Typography sx={styles.title}>{item.name}</Typography>
    }
  },
  {
    label: 'myResourcesPage.categories.updated',
    field: 'updatedAt',
    calculatedCellValue: (item: Categories) => (
      <Typography>{getFormattedDate({ date: item.updatedAt })}</Typography>
    )
  }
]

export const removeColumnRules: RemoveColumnRules<Categories> = {
  tablet: ['myOffersPage.tableHeaders.updated']
}

export const initialSort = { order: SortEnum.Desc, orderBy: 'updatedAt' }

export const itemsLoadLimit = {
  default: 10,
  mobile: 6,
  tablet: 8
}
