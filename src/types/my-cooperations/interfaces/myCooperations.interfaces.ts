import { RequestParams } from '~/types/services/services.index'

export interface MyCooperationsFilters {
  status: string
  search: string
}

export interface GetCooperationsParams
  extends Partial<MyCooperationsFilters>,
    RequestParams {}

export interface ScreenBasedLimits {
  desktop?: number
  laptopAndDesktop?: number
  laptop?: number
  tablet: number
  mobile: number
  default: number
}

export interface RemoveColumnRules {
  desktop?: TableColumns['label'][]
  tablet?: TableColumns['label'][]
  mobile?: TableColumns['label'][]
}

export interface TableColumns<T> {
  label: string
  calculatedCellValue: (item: T) => string | React.ReactNode
  field?: string
}
