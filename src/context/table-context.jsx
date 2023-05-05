import { createContext, useContext, useState } from 'react'
import usePagination from '../hooks/table/use-pagination'

const TableContext = createContext()

const TableProvider = ({
  children,
  initialSort,
  initialFilters,
  isSelection,
  columns,
  rowActions,
  bulkActions
}) => {
  const [sort, setSort] = useState(initialSort)

  const [filters, setFilters] = useState(initialFilters)

  const [selected, setSelected] = useState([])

  const numSelected = selected.length

  const [itemsCount, setItemsCount] = useState()

  const pagination = usePagination({ itemsCount })

  return (
    <TableContext.Provider
      value={{
        isSelection,
        columns,
        rowActions,
        bulkActions,
        initialFilters,
        sort,
        setSort,
        filters,
        setFilters,
        selected,
        numSelected,
        setSelected,
        setItemsCount,
        pagination
      }}
    >
      {children}
    </TableContext.Provider>
  )
}

const useTableContext = () => useContext(TableContext)

export { TableProvider, useTableContext }
