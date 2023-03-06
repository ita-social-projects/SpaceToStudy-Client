import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

import { useTableContext } from '~/context/table-context'
import useFilter from '~/hooks/table/use-filter'
import FilterCell from './filter-cell/FilterCell'

const FilterRow = () => {
  const { isSelection, columns, filters } = useTableContext()

  const { setFilterByKey, clearFilterByKey } = useFilter()
 
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
