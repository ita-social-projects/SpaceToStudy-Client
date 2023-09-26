import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

import FilterCell from '~/components/enhanced-table/filter-row/filter-cell/FilterCell'

const FilterRow = ({ columns, filter = {}, isSelection }) => {
  const { filters, setFilterByKey, clearFilterByKey } = filter

  const filterCells =
    filters &&
    columns.map((column) => (
      <FilterCell
        clearFilter={clearFilterByKey(column.field)}
        column={column}
        filter={filters[column.field]}
        key={column.field}
        setFilter={setFilterByKey(column.field)}
      />
    ))

  const emptyCell = isSelection && filters && <TableCell />

  return (
    <TableRow>
      {emptyCell}
      {filterCells}
      {emptyCell}
    </TableRow>
  )
}

export default FilterRow
