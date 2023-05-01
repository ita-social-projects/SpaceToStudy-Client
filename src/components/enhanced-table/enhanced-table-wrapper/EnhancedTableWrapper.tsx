import { ReactNode } from 'react'

import { TableProvider } from '~/context/table-context'

import { BulkAction, Column, Sort, RowAction } from '~/types'

interface EnhancedTableWrapperProps<Entity, Filters> {
  children: ReactNode
  bulkActions: BulkAction[]
  columns: Column<Entity>[]
  initialFilters: Filters
  initialSort: Sort
  isSelection: boolean
  rowActions: RowAction[]
}

const EnhancedTableWrapper = <Entity, Filters>({
  children,
  bulkActions,
  columns,
  initialFilters,
  initialSort,
  isSelection,
  rowActions
}: EnhancedTableWrapperProps<Entity, Filters>) => {
  return (
    <TableProvider<Entity, Filters>
      bulkActions={bulkActions}
      columns={columns}
      initialFilters={initialFilters}
      initialSort={initialSort}
      isSelection={isSelection}
      rowActions={rowActions}
    >
      {children}
    </TableProvider>
  )
}

export default EnhancedTableWrapper
