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

interface UseLoadMoreProps<Response, Params> {
  service: ServiceFunction<Response[], Params>
  limit: number
  params?: Params
}

const useLoadMore = <Response, Params>({
  service,
  limit,
  params
}: UseLoadMoreProps<Response, Params>): UseLoadMoreReturn<Response> => {
  const [skip, setSkip] = useState<number>(0)
  const [data, setData] = useState<Response[] | []>([])
  const [previousLimit, setPreviousLimit] = useState<number>(limit)

  const loadMore = useCallback(
    () => setSkip((prevState) => prevState + limit),
    [limit]
  )

  const handleResponse = useCallback(
    (data: Response[]) => setData((prevState) => [...prevState, ...data]),
    []
  )

  const resetData = useCallback(() => {
    setSkip(0)
    setData([])
  }, [])

  const { response, loading, fetchData } = useAxios<Response[], Params>({
    service,
    defaultResponse: defaultResponses.array,
    fetchOnMount: false,
    onResponse: handleResponse
  })

  useEffect(() => {
    if (previousLimit === limit) {
      void fetchData({ ...params, limit, skip } as Params)
    } else {
      resetData()
      setPreviousLimit(limit)
    }
  }, [fetchData, limit, previousLimit, resetData, skip, params])

  const isExpandable = useMemo(
    () => data.length > 0 && limit <= response.length,
    [limit, data, response]
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
