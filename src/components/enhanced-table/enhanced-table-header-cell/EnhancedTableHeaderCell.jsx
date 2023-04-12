import { useTranslation } from 'react-i18next'

import TableCell from '@mui/material/TableCell'
import TableSortLabel from '@mui/material/TableSortLabel'

import { useTableContext } from '~/context/table-context'
import useSort from '~/hooks/table/use-sort'

import { styles } from './EnhancedTableHeaderCell.styles'

const EnhancedTableHeaderCell = ({ column }) => {
  const { t } = useTranslation()
  const { sort } = useTableContext()
  const { onRequestSort } = useSort()

  const createSortHandler = (property) => (e) => {
    onRequestSort(e, property)
  }

  return (
    <TableCell key={column.field} sx={styles.root}>
      <TableSortLabel
        active={sort.orderBy === column.field}
        data-testid='tableSortLable'
        direction={sort.orderBy === column.field ? sort.order : 'asc'}
        onClick={createSortHandler(column.field)}
        sx={styles.sortLabel}
      >
        {t(column.label)}
      </TableSortLabel>
    </TableCell>
  )
}

export default EnhancedTableHeaderCell
