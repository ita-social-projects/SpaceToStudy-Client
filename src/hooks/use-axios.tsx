import { useState, useEffect, useCallback } from 'react'
import { AxiosError } from 'axios'
import { ErrorResponse, ServiceFunction } from '~/types'

interface UseAxiosProps<Response, TransformedResponse, Data> {
  service: ServiceFunction<Response, Data>
  defaultResponse: TransformedResponse
  fetchOnMount?: boolean
  transform?: (data: Response) => TransformedResponse
  onResponse?: () => void
  onResponseError?: (error: ErrorResponse) => void
}

interface UseAxiosReturn<TransformedResponse, Data> {
  response: TransformedResponse
  error: ErrorResponse | null
  loading: boolean
  fetchData: (data?: Data) => Promise<void>
}

const useAxios = <Response, Data = undefined, TransformedResponse = Response>({
  service,
  defaultResponse,
  fetchOnMount = true,
  transform,
  onResponse,
  onResponseError
}: UseAxiosProps<Response, TransformedResponse, Data>): UseAxiosReturn<
  TransformedResponse,
  Data
> => {
  const [response, setResponse] = useState<TransformedResponse>(defaultResponse)
  const [error, setError] = useState<ErrorResponse | null>(null)
  const [loading, setLoading] = useState<boolean>(fetchOnMount)

  const fetchData = useCallback(
    async (data?: Data) => {
      try {
        setLoading(true)
        const res = await service(data)
        const responseData = transform ? transform(res.data) : res.data
        setResponse(responseData as TransformedResponse)
        setError(null)
        onResponse && onResponse()
      } catch (e) {
        const error = e as AxiosError<ErrorResponse>
        if (error.response) {
          setError(error.response.data)
          onResponseError && onResponseError(error.response.data)
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
