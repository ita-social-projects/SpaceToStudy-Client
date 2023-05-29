import { useTranslation } from 'react-i18next'

import TableCell from '@mui/material/TableCell'
import TableSortLabel from '@mui/material/TableSortLabel'

import { styles } from '~/components/enhanced-table/enhanced-table-header-cell/EnhancedTableHeaderCell.styles'

const EnhancedTableHeaderCell = ({ column, sort }) => {
  const { t } = useTranslation()
  const { sort: sortParams, onRequestSort } = sort

  const createSortHandler = (property) => (e) => {
    onRequestSort(e, property)
  }

  return (
    <TableCell key={column.field} sx={styles.root}>
      <TableSortLabel
        active={sortParams.orderBy === column.field}
        data-testid='tableSortLabel'
        direction={
          sortParams.orderBy === column.field ? sortParams.order : 'asc'
        }
        onClick={createSortHandler(column.field)}
        sx={styles.sortLabel}
      >
        {t(column.label)}
      </TableSortLabel>
    </TableCell>
  )
}

export default EnhancedTableHeaderCell
