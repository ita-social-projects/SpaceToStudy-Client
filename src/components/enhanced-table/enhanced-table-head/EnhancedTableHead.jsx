import { useTranslation } from 'react-i18next'

import Checkbox from '@mui/material/Checkbox'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { useTableContext } from '~/context/table-context'
import EnhancedTableHeaderCell from '../enhanced-table-header-cell/EnhancedTableHeaderCell'

import { styles } from './EnhancedTableHead.styles'

const EnhancedTableHead = ({ itemsCount, onSelectAllClick }) => {
  const { t } = useTranslation()

  const { numSelected, isSelection, columns, pagination } = useTableContext()
  const { rowsPerPage } = pagination

  return (
    <TableHead sx={styles.tableHead}>
      <TableRow>
        {isSelection && (
          <TableCell padding='checkbox'>
            <Checkbox
              checked={itemsCount > 0 && numSelected === rowsPerPage}
              color='primary'
              indeterminate={numSelected > 0 && numSelected < rowsPerPage}
              onChange={onSelectAllClick}
            />
          </TableCell>
        )}
        {columns.map((column) => (
          <EnhancedTableHeaderCell column={column} key={column.field} />
        ))}
        {isSelection && <TableCell>{t('table.actions')}</TableCell>}
      </TableRow>
    </TableHead>
  )
}

export default EnhancedTableHead
