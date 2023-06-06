import { Cooperation } from '~/types/cooperation/cooperation.index'
import { RequestParams } from '~/types/services/services.index'

export interface MyCooperationsFilters {
  status: string
  search: string
}

export interface GetCooperationsParams
  extends Partial<MyCooperationsFilters>,
    Omit<RequestParams, 'sort'> {
  sort: {
    [key: string]: number
  }
}

export interface ScreenBasedLimits {
  desktop: number
  tablet: number
  mobile: number
  default: number
}

export interface RemoveColumnRules {
  desktop?: string[]
  tablet?: string[]
  mobile?: string[]
}

export interface CooperationTableColumns {
  label: string
  calculatedCellValue: (item: Cooperation) => string | React.ReactNode
  field?: string
}
