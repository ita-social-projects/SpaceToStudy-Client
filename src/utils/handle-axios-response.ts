import { type AxiosResponse } from 'axios'

import { ErrorResponse } from '~/types'

export async function handleAxiosResponse<T>(
  promise: Promise<AxiosResponse<T>>
): Promise<T> {
  const response = await promise
  if (response.status < 200 || response.status > 299) {
    const errorResponse = response.data as ErrorResponse
    throw new Error(errorResponse.message)
  }

  return response.data
}
