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

  const loadMore = useCallback(
    () => setSkip((prevState) => prevState + limit),
    [limit]
  )

  const resetData = useCallback(() => {
    setSkip(0)
    setData([])
  }, [])

  const { response, loading, fetchData } = useAxios<Response[], Params>({
    service,
    defaultResponse: defaultResponses.array,
    fetchOnMount: false
  })

  useEffect(() => {
    void fetchData({ ...params, limit, skip } as Params)
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
