import { createContext } from 'react'
import useFilter from '~/hooks/use-filter'
import useSelect from '~/hooks/use-select'
import usePagination from '~/hooks/use-pagination'
import useSort from '~/hooks/use-sort'

const TableContext = createContext()

const TableProvider = ({ children, initialSort, initialFilters, isSelection, columns, rowActions, bulkActions }) => {
  const sortProps = useSort(initialSort)
  const filterProps = useFilter(initialFilters)
  const selectProps = useSelect()
  const paginationProps = usePagination()

  return (
    <TableContext.Provider
      value={ {
        isSelection,
        columns,
        rowActions,
        bulkActions,
        ...sortProps,
        ...filterProps,
        ...selectProps,
        ...paginationProps
      } }
    >
      { children }
    </TableContext.Provider>
  )
}

export { TableProvider, TableContext }
