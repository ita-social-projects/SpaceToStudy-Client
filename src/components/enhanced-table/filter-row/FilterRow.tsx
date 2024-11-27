import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

import FilterCell from '~/components/enhanced-table/filter-row/filter-cell/FilterCell'
import { TableColumn, TableFilter } from '~/types'

interface FilterRowProps<I, F> {
  columns: TableColumn<I>[]
  filter?: TableFilter<F>
  isSelection?: boolean
}
const FilterRow = <I, F>({
  columns,
  filter,
  isSelection
}: FilterRowProps<I, F>) => {
  const filters = filter?.filters
  const setFilterByKey = filter?.setFilterByKey
  const clearFilterByKey = filter?.clearFilterByKey

  const filterCells =
    filters &&
    columns.map((column) => (
      <FilterCell
        clearFilter={clearFilterByKey?.(column.field as keyof F)}
        column={column}
        filter={filters[column.field as keyof F]}
        key={column.field}
        setFilter={setFilterByKey?.(column.field as keyof F)}
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
