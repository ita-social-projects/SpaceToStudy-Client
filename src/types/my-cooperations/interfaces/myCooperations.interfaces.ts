import { TFunction } from 'i18next'
import { NavigateFunction } from 'react-router-dom'
import {
  Cooperation,
  Lesson,
  Offer,
  TableColumn,
  Attachment,
  Quiz,
  Question,
  Categories
} from '~/types'
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

export interface RemoveColumnRules<
  T extends
    | Cooperation
    | Offer
    | Lesson
    | Attachment
    | Quiz
    | Question
    | Categories
> {
  desktop?: TableColumn<T>['label'][]
  tablet?: TableColumn<T>['label'][]
  mobile?: TableColumn<T>['label'][]
}

export interface AdditionalPropsInterface {
  t: TFunction
  navigate: NavigateFunction
}

export interface GetCooperationParams {
  id: string
}
