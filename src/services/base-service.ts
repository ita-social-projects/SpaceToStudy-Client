import { isAxiosError, type RawAxiosRequestHeaders } from 'axios'
import { ResponseError } from '~/exceptions'
import { axiosClient } from '~/plugins/axiosClient'
import { type ErrorResponse, type HttpMethod } from '~/types'

type RequestParams = {
  data?: unknown
  headers?: RawAxiosRequestHeaders
  method: HttpMethod
  timeout?: number
  url: string
}

export const baseService = {
  request: async <T = unknown>({
    data,
    headers,
    method,
    timeout,
    url
  }: RequestParams) => {
    try {
      const response = await axiosClient.request<T>({
        data,
        headers,
        method,
        timeout,
        url
      })

      return response.data
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        const serverError = error.response.data as ErrorResponse

        throw new ResponseError(serverError)
      }

      throw new ResponseError({
        code: 'UNKNOWN_ERROR',
        message: 'UNKNOWN_ERROR_MESSAGE'
      })
    }
  }
}
