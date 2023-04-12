import { createContext, useContext, useState } from 'react'

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

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [pageInput, setPageInput] = useState(1)

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
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        pageInput,
        setPageInput
      }}
    >
      {children}
    </TableContext.Provider>
  )
}

const useTableContext = () => useContext(TableContext)

export { TableProvider, useTableContext }
