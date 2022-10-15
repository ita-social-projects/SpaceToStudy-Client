import { useTranslation } from 'react-i18next'
import { useContext } from 'react'

import TableCell from '@mui/material/TableCell'
import TableSortLabel from '@mui/material/TableSortLabel'

import { TableContext } from '~/context/table-context'

import { styles } from './EnhancedTableHeaderCell.styles'

const EnhancedTableHeaderCell = ({ column }) => {
  const { t } = useTranslation()
  const { sort, onRequestSort } = useContext(TableContext)

  const createSortHandler = (property) => (e) => {
    onRequestSort(e, property)
  }

  return (
    <TableCell key={ column.field } sx={ styles.root }>
      <TableSortLabel
        active={ sort.orderBy === column.field }
        direction={ sort.orderBy === column.field ? sort.order : 'asc' }
        onClick={ createSortHandler(column.field) }
        sx={ styles.sortLabel }
      >
        { t(column.label) }
      </TableSortLabel>
    </TableCell>
  )
}

export default EnhancedTableHeaderCell
