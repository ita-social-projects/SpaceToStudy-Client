import { useCallback, useEffect, useState } from 'react'
import { AxiosError } from 'axios'

import { ErrorResponse, ServiceFunction } from '~/types'

export interface UseAxiosProps<
  Response,
  Params = undefined,
  TransformedResponse = Response
> {
  service: ServiceFunction<Response, Params>
  defaultResponse?: TransformedResponse
  fetchOnMount?: boolean
  transform?: (params: Response) => TransformedResponse
  onResponse?: (responseData: TransformedResponse) => Promise<void> | void
  onResponseError?: (error: ErrorResponse) => void
}

interface UseAxiosReturn<TransformedResponse, Params> {
  response: TransformedResponse
  error: ErrorResponse | null
  loading: boolean
  fetchData: (
    params?: Params extends undefined ? undefined : Params
  ) => Promise<void>
}

const useAxios = <
  Response,
  Params = undefined,
  TransformedResponse = Response
>({
  service,
  defaultResponse = {} as TransformedResponse,
  fetchOnMount = true,
  transform,
  onResponse,
  onResponseError
}: UseAxiosProps<Response, Params, TransformedResponse>): UseAxiosReturn<
  TransformedResponse,
  Params
> => {
  const [response, setResponse] = useState<TransformedResponse>(defaultResponse)
  const [error, setError] = useState<ErrorResponse | null>(null)
  const [loading, setLoading] = useState<boolean>(fetchOnMount)

  const fetchData = useCallback(
    async (params?: Params) => {
      try {
        setLoading(true)
        // Use type assertion to handle undefined params properly
        const res = await service(
          params as Params extends undefined ? undefined : Params
        )
        const responseData = transform ? transform(res.data) : res.data
        setResponse(responseData as TransformedResponse)
        setError(null)
        if (onResponse) {
          await onResponse(responseData as TransformedResponse)
        }
      } catch (e) {
        const error = e as AxiosError<ErrorResponse>
        if (error.response) {
          setError(error.response.data)
          if (onResponseError) {
            onResponseError(error.response.data)
          }
        }
      } finally {
        setLoading(false)
      }
    },
    [service, transform, onResponse, onResponseError]
  )

  useEffect(() => {
    if (fetchOnMount) {
      void fetchData()
    }
  }, [fetchData, fetchOnMount])

  return { response, error, loading, fetchData }
}

export default useAxios
