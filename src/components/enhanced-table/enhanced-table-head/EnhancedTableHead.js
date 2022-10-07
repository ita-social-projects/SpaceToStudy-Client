import { useTranslation } from 'react-i18next'
import { useContext } from 'react'

import Checkbox from '@mui/material/Checkbox'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import EnhancedTableHeaderCell from '../enhanced-table-header-cell/EnhancedTableHeaderCell'
import { TableContext } from '~/context/table-context'

import { styles } from './EnhancedTableHead.styles'

const EnhancedTableHead = ({ itemsCount, onSelectAllClick }) => {
  const { t } = useTranslation()

  const { filters, setFilterByKey, numSelected, isSelection, columns, rowsPerPage } = useContext(TableContext)

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
            setFilter={ setFilterByKey(column.field) }
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
