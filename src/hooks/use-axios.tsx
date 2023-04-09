import { useState, useEffect, useCallback } from 'react'
import { AxiosError, AxiosResponse } from 'axios'
import { ErrorResponse } from '~/types'

interface UseAxiosProps<T, D> {
  service: (data?: D) => Promise<AxiosResponse<T>>
  defaultResponse: T
  fetchOnMount?: boolean
  clearResponse?: boolean
}

interface UseAxiosReturn<T, D> {
  response: T | []
  mapArrayByField: (data: T, field: string) => string[]
  error: AxiosError<ErrorResponse> | null
  loading: boolean
  fetchData: (data?: D) => void
}

const useAxios = <T, D = unknown>({
  service,
  defaultResponse,
  fetchOnMount = true,
  clearResponse = false
}: UseAxiosProps<T, D>): UseAxiosReturn<T, D> => {
  const [response, setResponse] = useState<T | []>(defaultResponse)
  const [error, setError] = useState<AxiosError<ErrorResponse> | null>(null)
  const [loading, setLoading] = useState<boolean>(fetchOnMount)

  const mapArrayByField = useCallback(
    (data: T, field: string) => Array.isArray(data) && data.reduce((acc, item) => [...acc, item[field]], []),
    []
  )

  const fetchData = useCallback(
    async (data?: D) => {
      try {
        clearResponse && setResponse([])
        setLoading(true)
        const res = await service(data)
        setResponse(res.data)
        setError(null)
      } catch (e) {
        setError(e as AxiosError<ErrorResponse>)
      } finally {
        setLoading(false)
      }
    },
    [service, clearResponse]
  )

  useEffect(() => {
    if (fetchOnMount) {
      fetchData()
    }
  }, [fetchData, fetchOnMount])

  return { response, mapArrayByField, error, loading, fetchData }
}

export default useAxios
