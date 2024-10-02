import { ChangeEvent, ReactElement } from 'react'

import { Sort } from '~/types/common/common.index'
import { AdditionalPropsInterface } from '~/types/my-cooperations/myCooperations.index'
import { TableActionFunc } from './enhancedTable.types'

export interface TableColumn<I> {
  field?: string
  label: string
  calculatedCellValue: (
    item: I,
    additionalProps: AdditionalPropsInterface
  ) => string | ReactElement
}

export interface TableRowAction {
  label: string
  func: TableActionFunc
}

export interface TableItem {
  _id: string
  title?: string
  fileName?: string
}

export interface TableSelect<I> {
  selected: string[]
  createSelectAllHandler: (
    items: I[]
  ) => (e: ChangeEvent<HTMLInputElement>) => void
  handleSelectClick: (item: string, e?: ChangeEvent<HTMLInputElement>) => void
  isSelected: (id: string) => boolean
}

export interface TableFilter<F> {
  filters: F
  setFilterByKey: (columnField: keyof F) => void
  clearFilterByKey: (columnField: keyof F) => void
}

export interface TableSort {
  sort: Sort
  onRequestSort: (columnField: string) => void
}

export interface TableData<I> {
  items: I[]
  count?: number
  loading?: boolean
  getData?: () => void
}

export interface TablePaginationProps {
  page: number
  pageInput: number | string
  rowsPerPage: number
  pageCount: number
  itemsCount: number
  handleChangePage: (
    event: ChangeEvent<unknown> | MouseEvent | null,
    page: number
  ) => void
  handleChangeRowsPerPage: (e: ChangeEvent<HTMLInputElement>) => void
  handleChangePageInput: (e: ChangeEvent<HTMLInputElement>) => void
  handlePageSubmit: (maxPages: number) => void
}
