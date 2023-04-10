import { useState, useEffect, useCallback } from 'react'
import { AxiosError, AxiosResponse } from 'axios'
import { ErrorResponse } from '~/types'
import { mapArrayByField } from '~/utils/map-array-by-field'

interface UseAxiosProps<T, R, D> {
  service: (data?: D) => Promise<AxiosResponse<T>>
  defaultResponse: R
  fetchOnMount?: boolean
  clearResponse?: boolean
  transform?: string | null
}

interface UseAxiosReturn<R, D> {
  response: R
  error: AxiosError<ErrorResponse> | null
  loading: boolean
  fetchData: (data?: D) => void
}

const useAxios = <T, R = T, D = unknown>({
  service,
  defaultResponse,
  fetchOnMount = true,
  clearResponse = false,
  transform = null
}: UseAxiosProps<T, R, D>): UseAxiosReturn<R, D> => {
  const [response, setResponse] = useState<R>(defaultResponse)
  const [error, setError] = useState<AxiosError<ErrorResponse> | null>(null)
  const [loading, setLoading] = useState<boolean>(fetchOnMount)

  const fetchData = useCallback(
    async (data?: D) => {
      try {
        clearResponse && setResponse(defaultResponse)
        setLoading(true)
        const res = await service(data)
        const responseData = (transform && mapArrayByField(res.data, transform)) || res.data
        setResponse(responseData)
        setError(null)
      } catch (e) {
        setError(e as AxiosError<ErrorResponse>)
      } finally {
        setLoading(false)
      }
    },
    [service, clearResponse, mapArrayByField, transform]
  )

  useEffect(() => {
    if (fetchOnMount) {
      fetchData()
    }
  }, [fetchData, fetchOnMount])

  return { response, error, loading, fetchData }
}

export default useAxios
