import { createContext, useContext, useState, ReactNode, useMemo } from 'react'

import usePagination from '../hooks/table/use-pagination'
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

  const [itemsCount, setItemsCount] = useState<number>()

  const pagination = usePagination({ itemsCount })

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
      setItemsCount,
      pagination
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
    pagination
  ])

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>
}

const useTableContext = () => useContext(TableContext)

export { TableProvider, useTableContext }
