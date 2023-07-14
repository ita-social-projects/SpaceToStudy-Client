import { useCallback, useEffect, useState } from 'react'

const useAxios = ({
  service,
  defaultResponse,
  fetchOnMount = true,
  transform,
  onResponse,
  onResponseError
}) => {
  const [response, setResponse] = useState(defaultResponse)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(fetchOnMount)

  const fetchData = useCallback(
    async (params) => {
      try {
        setLoading(true)
        const res = await service(params)
        const responseData = transform ? transform(res.data) : res.data
        setResponse(responseData)
        setError(null)
        onResponse && onResponse(responseData)
      } catch (e) {
        const error = e
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
