import { ChangeEvent, MouseEventHandler } from 'react'
import { Sort } from '~/types/common/common.index'

export interface TableColumn {
  field: string
  calculatedCellValue?: () => string
}

export interface TableRowAction {
  label: string
  func: (id: string) => Promise<void>
}

export interface TableItem {
  _id: string
  [key: string]: string | number
}

export interface TableSelect {
  selected: string[]
  createSelectAllHandler: (items: TableItem[]) => void
  handleSelectClick: (e: ChangeEvent<HTMLInputElement>, item: string) => void
  isSelected: (id: string) => boolean
}

export interface TableFilter<F> {
  filters: F
  setFilterByKey: (columnField: string) => void
  clearFilterByKey: (columnField: string) => void
}

export interface TableSort {
  sort: Sort
  onRequestSort: (
    e: MouseEventHandler<HTMLSpanElement>,
    property: string
  ) => void
}

export interface TableData {
  items: TableItem[]
  loading: boolean
  getData: () => void
}
