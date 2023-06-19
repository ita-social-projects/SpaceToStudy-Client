import { RequestParams } from '~/types/services/services.index'
import { Cooperation, Offer } from '~/types'

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

export interface RemoveColumnRules<T extends Cooperation | Offer> {
  desktop?: TableColumns<T>['label'][]
  tablet?: TableColumns<T>['label'][]
  mobile?: TableColumns<T>['label'][]
}

export interface TableColumns<T> {
  label: string
  calculatedCellValue: (item: T) => string | React.ReactNode
  field?: string
}
