import { useState, useEffect, useCallback } from 'react'

const useAxios = ({ service, fetchOnMount = true }) => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(fetchOnMount)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const res = await service()
      setResponse(res)
      setError(null)
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [service])

  useEffect(() => {
    if(fetchOnMount) {
      fetchData()
    }
  }, [fetchData, fetchOnMount] )

  return { response, error, loading, fetchData }
}

export default useAxios
