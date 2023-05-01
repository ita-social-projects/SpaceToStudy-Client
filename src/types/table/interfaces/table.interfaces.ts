import { SetStateAction, Dispatch } from 'react'
import { AxiosResponse } from 'axios'

import {
  BulkAction,
  Sort,
  RowAction,
  ExternalFilter,
  FilterEnum
} from '~/types'

export interface Column<T> {
  label: string
  field: string
  dataType: 'string' | 'enums' | 'date'
  calculatedCellValue?: (item: T) => string
  filterEnum?: FilterEnum[]
}

export interface TableContextType<T, U> {
  isSelection: boolean
  columns: Column<T>[]
  initialFilters: U
  rowActions: RowAction[]
  bulkActions: BulkAction[]
  sort: Sort
  setSort: Dispatch<SetStateAction<Sort>>
  filters: U
  setFilters: Dispatch<SetStateAction<U>>
  numSelected: number
  selected: string[]
  setSelected: Dispatch<SetStateAction<string[]>>
  page: number
  setPage: Dispatch<SetStateAction<number>>
  rowsPerPage: number
  setRowsPerPage: Dispatch<SetStateAction<number>>
  pageInput: number
  setPageInput: Dispatch<SetStateAction<number>>
}

export interface EnhancedTableProps<T> {
  fetchService: (options: T) => Promise<AxiosResponse>
  externalFilter: ExternalFilter
}
