import { useState, useEffect, useCallback, useMemo } from 'react'

const useAxios = ({  service, defaultResponse = [], fetchOnMount = true, clearResponse = false }) => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(fetchOnMount)

  const fetchData = useCallback(
    async (data) => {
      try {
        clearResponse && setResponse(null)
        setLoading(true)
        const res = await service(data)
        setResponse(res)
        setError(null)
        return res
      } catch (e) {
        setError(e)
      } finally {
        setLoading(false)
      }
    },
    [service, clearResponse]
  )

  const data = useMemo(() => response?.data || defaultResponse, [response, defaultResponse])

  useEffect(() => {
    if (fetchOnMount) {
      fetchData()
    }
  }, [fetchData, fetchOnMount])

  return { response, data, error, loading, fetchData }
}

export default useAxios
