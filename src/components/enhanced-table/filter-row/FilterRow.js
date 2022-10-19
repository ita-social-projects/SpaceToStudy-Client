import { useContext } from 'react'

import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

import { TableContext } from '~/context/table-context'
import FilterCell from './filter-cell/FilterCell'

const FilterRow = () => {
  const { isSelection, columns, filters, setFilterByKey, clearFilterByKey } = useContext(TableContext)

  const filterCells = columns.map((column) => (
    <FilterCell
      clearFilter={ () => clearFilterByKey(column.field) }
      column={ column }
      filter={ filters[column.field] }
      key={ column.field }
      setFilter={ setFilterByKey(column.field) }
    />
  ))

  const emptyCell = isSelection && <TableCell />

  return (
    <TableRow>
      { emptyCell }
      { filterCells }
      { emptyCell }
    </TableRow>
  )
}

export default FilterRow
