import { useState, useEffect, useCallback } from 'react'
import { AxiosError, AxiosResponse } from 'axios'
import { ErrorResponse } from '~/types'

interface UseAxiosProps<T, R> {
  service: (data?: unknown) => Promise<AxiosResponse<T>>
  defaultResponse: R
  fetchOnMount?: boolean
  transform?: (data: T) => R
  onResponse?: () => void
  onResponseError?: () => void
}

interface UseAxiosReturn<R> {
  response: R
  error: AxiosError<ErrorResponse> | null
  loading: boolean
  fetchData: (data?: unknown) => Promise<void>
}

const useAxios = <T, R = T>({
  service,
  defaultResponse,
  fetchOnMount = true,
  transform,
  onResponse,
  onResponseError
}: UseAxiosProps<T, R>): UseAxiosReturn<R> => {
  const [response, setResponse] = useState<R>(defaultResponse)
  const [error, setError] = useState<AxiosError<ErrorResponse> | null>(null)
  const [loading, setLoading] = useState<boolean>(fetchOnMount)

  const fetchData = useCallback(
    async (data?: unknown) => {
      try {
        setLoading(true)
        const res = await service(data)
        const responseData = transform ? transform(res.data) : res.data
        setResponse(responseData as R)
        setError(null)
        onResponse && onResponse()
      } catch (e) {
        setError(e as AxiosError<ErrorResponse>)
        onResponseError && onResponseError()
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
