import { createContext, useContext } from 'react'
import useFilter from '~/hooks/table-hooks/use-filter'
import useSelect from '~/hooks/table-hooks/use-select'
import usePagination from '~/hooks/table-hooks/use-pagination'
import useSort from '~/hooks/table-hooks/use-sort'

const TableContext = createContext()

const useTableContext = () => useContext(TableContext)

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

export { TableProvider, TableContext, useTableContext }
