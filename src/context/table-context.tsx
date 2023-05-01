import { createContext, useContext, useState, ReactNode, useMemo } from 'react'
import { BulkAction, Column, Sort, RowAction } from '~/types'

export interface TableProviderProps<T, U> {
  children: ReactNode
  isSelection: boolean
  columns: Column<T>[]
  initialFilters: U
  initialSort: Sort
  rowActions: RowAction[]
  bulkActions: BulkAction[]
}

const TableContext = createContext<unknown>(null)

const TableProvider = <Entity, Filters>({
  children,
  initialSort,
  initialFilters,
  isSelection,
  columns,
  rowActions,
  bulkActions
}: TableProviderProps<Entity, Filters>) => {
  const [sort, setSort] = useState<Sort>(initialSort)

  const [filters, setFilters] = useState<Filters>(initialFilters)

  const [selected, setSelected] = useState<string[]>([])

  const numSelected = selected.length

  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(5)
  const [pageInput, setPageInput] = useState<number>(1)

  const value = useMemo(() => {
    return {
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
    }
  }, [
    isSelection,
    columns,
    rowActions,
    bulkActions,
    initialFilters,
    sort,
    filters,
    selected,
    numSelected,
    page,
    rowsPerPage,
    pageInput
  ])

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>
}

const useTableContext = () => useContext(TableContext)

export { TableProvider, useTableContext }
