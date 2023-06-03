import TableCell from '@mui/material/TableCell'

import SearchInput from '~/components/search-input/SearchInput'
import DateFilter from '~/components/enhanced-table/date-filter/DateFilter'
import EnumFilter from '~/components/enhanced-table/enum-filter/EnumFilter'

const FilterCell = ({ column, filter, setFilter, clearFilter }) => {
  const enums = (
    <EnumFilter
      clearFilter={clearFilter}
      column={column}
      filter={filter}
      setFilter={setFilter}
    />
  )

  const string = (
    <SearchInput
      data-testid='searchInput'
      search={filter}
      setSearch={setFilter}
    />
  )

  const date = (
    <DateFilter
      clearFilter={clearFilter}
      filter={filter}
      setFilter={setFilter}
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
