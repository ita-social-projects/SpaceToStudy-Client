import { useTranslation } from 'react-i18next'

import TableCell from '@mui/material/TableCell'
import TableSortLabel from '@mui/material/TableSortLabel'

import { styles } from '~/components/enhanced-table/enhanced-table-header-cell/EnhancedTableHeaderCell.styles'
import { TableColumn, TableItem, TableSort } from '~/types'

export interface EnhancedTableHeaderCellProps<I> {
  column: TableColumn<I>
  sort: TableSort
}

const EnhancedTableHeaderCell = <I extends TableItem>({
  column,
  sort
}: EnhancedTableHeaderCellProps<I>) => {
  const { t } = useTranslation()
  const { sort: sortParams, onRequestSort } = sort

  const createSortHandler = () => {
    onRequestSort(column.field ?? '')
  }

  return (
    <TableCell sx={styles.root}>
      <TableSortLabel
        active={sortParams.orderBy === column.field}
        data-testid='tableSortLabel'
        direction={
          sortParams.orderBy === column.field ? sortParams.order : 'asc'
        }
        disabled={!column.field}
        onClick={createSortHandler}
        sx={styles.sortLabel}
      >
        {t(column.label)}
      </TableSortLabel>
    </TableCell>
  )
}

export default EnhancedTableHeaderCell
