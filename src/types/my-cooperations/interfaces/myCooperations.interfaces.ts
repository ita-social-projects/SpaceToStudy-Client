import { Cooperation } from '~/types/cooperation/cooperation.index'
import { RequestParams } from '~/types/services/services.index'

export interface MyCooperationsFilters {
  status: string
  search: string
}

export interface GetCooperationsParams
  extends Partial<MyCooperationsFilters>,
    RequestParams {}

export interface ScreenBasedLimits {
  desktop: number
  tablet: number
  mobile: number
  default: number
}

export interface RemoveColumnRules {
  desktop?: TableColumns['label'][]
  tablet?: TableColumns['label'][]
  mobile?: TableColumns['label'][]
}

export interface TableColumns {
  label: string
  calculatedCellValue: (item: Cooperation) => string | React.ReactNode
  field?: string
}
