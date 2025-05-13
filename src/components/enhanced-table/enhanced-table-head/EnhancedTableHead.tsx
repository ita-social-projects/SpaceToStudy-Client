import { useTranslation } from 'react-i18next'
import Checkbox from '@mui/material/Checkbox'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import EnhancedTableHeaderCell from '~/components/enhanced-table/enhanced-table-header-cell/EnhancedTableHeaderCell'

import { styles } from '~/components/enhanced-table/enhanced-table-head/EnhancedTableHead.styles'
import {
  TableColumn,
  TableData,
  TableItem,
  TableRowAction,
  TableSelect,
  TableSort
} from '~/types'

export interface EnhancedTableHeadProps<I> {
  columns: TableColumn<I>[]
  data: TableData<I>
  isSelection?: boolean
  rowsPerPage?: number
  rowActions?: TableRowAction[]
  select?: TableSelect<I>
  sort: TableSort
}

const EnhancedTableHead = <I extends TableItem>({
  columns,
  data,
  isSelection,
  rowActions,
  select = {} as TableSelect<I>,
  sort
}: EnhancedTableHeadProps<I>) => {
  const { t } = useTranslation()
  const { selected, createSelectAllHandler } = select
  const { items, count } = data
  const itemsCount = count ?? items.length

  const checkboxCell = isSelection && (
    <TableCell padding='checkbox'>
      <Checkbox
        checked={itemsCount > 0 && selected.length === itemsCount}
        color='primary'
        indeterminate={
          selected.length > 0 && selected.length < (itemsCount ?? 0)
        }
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
