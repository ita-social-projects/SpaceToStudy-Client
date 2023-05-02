import { Sort } from '~/types'
import { AxiosResponse } from 'axios'

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

export type ServiceFunction<Response, Params = undefined> = (
  params?: Params
) => Promise<AxiosResponse<Response>>
