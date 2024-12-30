import { isAxiosError } from 'axios'
import { ResponseError } from '~/exceptions'
import { axiosClient } from '~/plugins/axiosClient'
import { type ErrorResponse, type HttpMethod } from '~/types'

type RequestParams = {
  data?: unknown
  method: HttpMethod
  url: string
}

export const baseService = {
  request: async <T = unknown>({ method, url, data }: RequestParams) => {
    try {
      const response = await axiosClient.request<T>({
        url,
        method,
        data
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
