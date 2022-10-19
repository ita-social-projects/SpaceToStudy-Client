import { createContext, useContext } from 'react'
import useFilter from '~/hooks/table/use-filter'
import useSelect from '~/hooks/table/use-select'
import usePagination from '~/hooks/table/use-pagination'
import useSort from '~/hooks/table/use-sort'

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
