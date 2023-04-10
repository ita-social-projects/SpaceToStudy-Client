import { useState, useEffect, useCallback  } from 'react'

const useAxios = ({ service, defaultResponse = null, fetchOnMount = true, clearResponse = false }) => {
  const [response, setResponse] = useState(defaultResponse)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(fetchOnMount)

  const fetchData = useCallback(
    async (data) => {
      try {
        clearResponse && setResponse([])
        setLoading(true)
        const res = await service(data)
        setResponse(res.data)
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

  useEffect(() => {
    if (fetchOnMount) {
      fetchData()
    }
  }, [fetchData, fetchOnMount])

  return { response, error, loading, fetchData }
}

export default useAxios
