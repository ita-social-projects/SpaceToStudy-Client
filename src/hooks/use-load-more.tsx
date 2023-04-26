import { useState, useMemo, useEffect, useCallback } from 'react'

import useAxios from '~/hooks/use-axios'
import { defaultResponses } from '~/constants'
import { ServiceFunction } from '~/types'

interface UseLoadMoreReturn<Response> {
  data: Response[]
  loading: boolean
  resetData: () => void
  loadMore: () => void
  isExpandable: boolean
}

interface UseLoadMoreProps<Response, Data> {
  service: ServiceFunction<Response[], Data>
  limit: number
  params?: Data
}

const useLoadMore = <Response, Data>({
  service,
  limit,
  params
}: UseLoadMoreProps<Response, Data>): UseLoadMoreReturn<Response> => {
  const [skip, setSkip] = useState<number>(0)
  const [data, setData] = useState<Response[] | []>([])

  const loadMore = useCallback(
    () => setSkip((prevState) => prevState + limit),
    [limit]
  )

  const resetData = useCallback(() => {
    setSkip(0)
    setData([])
  }, [])

  const { response, loading, fetchData } = useAxios<Response[], Data>({
    service,
    defaultResponse: defaultResponses.array,
    fetchOnMount: false
  })

  useEffect(() => {
    void fetchData({ ...params, limit, skip } as Data)
  }, [fetchData, limit, skip, params])

  useEffect(() => {
    response.length && setData((prevState) => [...prevState, ...response])
  }, [response])

  const isExpandable = useMemo(
    () => limit <= response.length,
    [limit, response]
  )

  return {
    data,
    loading,
    resetData,
    loadMore,
    isExpandable
  }
}

export default useLoadMore
