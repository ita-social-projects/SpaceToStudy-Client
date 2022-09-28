import { useTranslation } from 'react-i18next'

import Checkbox from '@mui/material/Checkbox'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import EnhancedTableCell from '../enhanced-table-cell/EnhancedTableCell'

import { styles } from './EnhancedTableHead.styles'

const EnhancedTableHead = ({
  onSelectAllClick,
  sort,
  itemsCount,
  numSelected,
  onRequestSort,
  filtersObj,
  getSetFilterByKey,
  isSelection,
  headCells,
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
        { headCells.map((headCell) => (
          <EnhancedTableCell
            filterArr={ filtersObj[headCell.id] }
            headCell={ headCell }
            key={ headCell.id }
            onRequestSort={ onRequestSort }
            setFilter={ getSetFilterByKey(headCell.id) }
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
