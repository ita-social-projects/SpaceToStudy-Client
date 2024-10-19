import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { Sort } from '~/types'

export interface RequestParams {
  limit?: number
  skip?: number
  sort?: Sort
  categories?: string[]
}

export interface ErrorResponse {
  code: string
  message: string
  status: number
}

export type ServiceFunction<Response, Params = undefined> = (
  params: Params extends undefined ? undefined : Params
) => Promise<AxiosResponse<Response>>

export interface AxiosResponseError extends AxiosError<ErrorResponse> {
  config: InternalAxiosRequestConfig & { _isRetry: boolean }
}
