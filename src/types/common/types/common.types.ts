import { EnhancedTableProps } from '~/types/common/interfaces/common.interfaces'

export type Address = {
  country: string
  city: string
}

export type Category = {
  _id: string
  name: string
}

export type CreatedAt = {
  from: string
  to: string
}

export type LastLogin = {
  from: string
  to: string
}

export type Sort = {
  order: string
  orderBy: string
}

export type FilterEnum = {
  label: string
  value: string
}

export type DateFilter = {
  from: string
  to: string
}

export type InitialSort = {
  order: 'asc' | 'desc'
  orderBy: string
}

export type TabsInfoItem<T, U> = {
  key: string
  component: React.FC<EnhancedTableProps<T, U>>
} & FilterEnum

export type TabsInfo<T, U> = {
  [key: string]: TabsInfoItem<T, U>
}

export type Column<T> = {
  label: string
  field: string
  dataType: 'string' | 'enums' | 'date'
  calculatedCellValue?: (item: T) => string
  filterEnum?: FilterEnum[]
}

export type RowAction = {
  label: string
  func: (id: string) => Promise<void>
}

export type BulkAction = {
  title: string
  func: (ids: string[]) => Promise<void>
  icon: JSX.Element
}
