import { Sort } from '~/types/common/common.index'

export interface RequestParams {
  limit: number
  skip: number
  sort: Sort
}

export interface ErrorResponse {
  code: string
  message: string
  status: number
}
