import { createContext, useContext, useState } from 'react'

import { TableProviderProps } from '~/types/common/interfaces/common.interfaces'
import { InitialSort } from '~/types/common/types/common.types'

const TableContext = createContext<unknown>(null)

const TableProvider = <T, U>({
  children,
  initialSort,
  initialFilters,
  isSelection,
  columns,
  rowActions,
  bulkActions
}: TableProviderProps<T, U>) => {
  const [sort, setSort] = useState<InitialSort>(initialSort)

  const [filters, setFilters] = useState<U>(initialFilters)

  const [selected, setSelected] = useState<string[]>([])

  const numSelected = selected.length

  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(5)
  const [pageInput, setPageInput] = useState<number>(1)

  return (
    <TableContext.Provider
      value={ {
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
      } }
    >
      { children }
    </TableContext.Provider>
  )
}

const useTableContext = () => useContext(TableContext)

export { TableProvider, useTableContext }
