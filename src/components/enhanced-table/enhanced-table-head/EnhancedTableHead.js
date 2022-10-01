import { useTranslation } from 'react-i18next'

import Checkbox from '@mui/material/Checkbox'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import EnhancedTableHeaderCell from '../enhanced-table-header-cell/EnhancedTableHeaderCell'

import { styles } from './EnhancedTableHead.styles'

const EnhancedTableHead = ({
  onSelectAllClick,
  sort,
  itemsCount,
  numSelected,
  onRequestSort,
  filters,
  getSetFilterByKey,
  isSelection,
  columns,
  rowsPerPage
}) => {
  const { t } = useTranslation()

  return (
    <TableHead sx={ styles.tableHead }>
      <TableRow>
        { isSelection && (
          <TableCell padding='checkbox'>
            <Checkbox
              checked={ itemsCount > 0 && numSelected === rowsPerPage }
              color='primary'
              indeterminate={ numSelected > 0 && numSelected < rowsPerPage }
              onChange={ onSelectAllClick }
            />
          </TableCell>
        ) }
        { columns.map((column) => (
          <EnhancedTableHeaderCell
            column={ column }
            filterArr={ filters[column.field] }
            key={ column.field }
            onRequestSort={ onRequestSort }
            setFilter={ getSetFilterByKey(column.field) }
            sort={ sort }
          />
        )) }
        { isSelection && (<TableCell>
          { t('table.actions') }
        </TableCell>) }
      </TableRow>
    </TableHead>
  )
}

export default EnhancedTableHead
