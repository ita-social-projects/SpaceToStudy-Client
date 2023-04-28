import { EnhancedTableProps } from '~/types/table/table.index'

export type FilterEnum = {
  label: string
  value: string
}

export type InitialSort = {
  order: 'asc' | 'desc'
  orderBy: string
}

export type TabsInfoItem<T> = {
  key: string
  component: React.FC<EnhancedTableProps<T>>
} & FilterEnum

export type TabsInfo<T> = {
  [key: string]: TabsInfoItem<T>
}

export type Options<T> = {
  skip: number
  limit: number
  sort: InitialSort
} & T

export type ExternalFilter = {
  [key: string]: string
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
