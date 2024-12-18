import TableCell from '@mui/material/TableCell'

import SearchInput from '~/components/search-input/SearchInput'
import DateFilter from '~/components/enhanced-table/date-filter/DateFilter'
import EnumFilter from '~/components/enhanced-table/enum-filter/EnumFilter'
import { TableColumn } from '~/types'
import { FilterEnum } from '~/types/components/enum-filter/enumFilter.interface'

interface TableColumnProps<I> extends TableColumn<I> {
  dataType: 'string'
  filterEnum: FilterEnum[]
}

interface Filter {
  from: string | null
  to: string | null
}

interface FilterCellProps<I, F> {
  column: TableColumnProps<I>
  filter?: F
  setFilter: (filter: F) => void
  clearFilter: () => void
}

const FilterCell = <I, F extends Filter | string | string[]>({
  column,
  filter,
  setFilter,
  clearFilter
}: FilterCellProps<I, F>) => {
  const enums = (
    <EnumFilter
      clearFilter={clearFilter}
      column={column}
      filter={filter as string[]}
      setFilter={setFilter as (filter: string[]) => void}
    />
  )

  const string = (
    <SearchInput
      data-testid='searchInput'
      search={filter as string}
      setSearch={setFilter as React.Dispatch<React.SetStateAction<string>>}
    />
  )

  const date = (
    <DateFilter
      clearFilter={clearFilter}
      filter={filter as Filter}
      setFilter={setFilter as (filter: Filter) => void}
    />
  )

  const dataTypes = {
    string,
    date,
    enums
  }

  return column.dataType ? (
    <TableCell size='small'>{dataTypes[column.dataType]}</TableCell>
  ) : null
}

export default FilterCell
