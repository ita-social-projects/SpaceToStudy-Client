import { useTranslation } from 'react-i18next'
import Checkbox from '@mui/material/Checkbox'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import EnhancedTableHeaderCell from '~/components/enhanced-table/enhanced-table-header-cell/EnhancedTableHeaderCell'

import { styles } from '~/components/enhanced-table/enhanced-table-head/EnhancedTableHead.styles'

const EnhancedTableHead = ({
  columns,
  data,
  isSelection,
  rowsPerPage,
  rowActions,
  select = {},
  sort
}) => {
  const { t } = useTranslation()
  const { selected, createSelectAllHandler } = select
  const { items, count: itemsCount } = data

  const checkboxCell = isSelection && (
    <TableCell padding='checkbox'>
      <Checkbox
        checked={itemsCount > 0 && selected.length === rowsPerPage}
        color='primary'
        indeterminate={selected.length > 0 && selected.length < rowsPerPage}
        onChange={createSelectAllHandler(items)}
      />
    </TableCell>
  )

  const headerCells = columns.map((column) => (
    <EnhancedTableHeaderCell column={column} key={column.label} sort={sort} />
  ))

  return (
    <TableHead sx={styles.tableHead}>
      <TableRow>
        {isSelection && checkboxCell}
        {headerCells}
        {rowActions && <TableCell>{t('table.actions')}</TableCell>}
      </TableRow>
    </TableHead>
  )
}

export default EnhancedTableHead
