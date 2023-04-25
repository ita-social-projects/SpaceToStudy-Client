import { useState, useMemo, useEffect, useCallback } from 'react'
import { AxiosResponse } from 'axios'

import useAxios from '~/hooks/use-axios'

import { CategoriesParams } from '~/types'
import { defaultResponses } from '~/constants'

interface UseLoadMoreReturn<T> {
  data: T[]
  loading: boolean
  resetData: () => void
  loadMore: () => void
  isExpandable: boolean
}

interface UseLoadMoreProps<T> {
  service: (data: Partial<CategoriesParams>) => Promise<AxiosResponse<T[]>>
  limit: number
  params?: Partial<CategoriesParams>
}

const useLoadMore = <T,>({
  service,
  limit,
  params
}: UseLoadMoreProps<T>): UseLoadMoreReturn<T> => {
  const [skip, setSkip] = useState<number>(0)
  const [data, setData] = useState<T[] | []>([])

  const loadMore = useCallback(
    () => setSkip((prevState) => prevState + limit),
    [limit]
  )

  const resetData = useCallback(() => {
    setSkip(0)
    setData([])
  }, [])

  const { response, loading, fetchData } = useAxios({
    service,
    defaultResponse: defaultResponses.array,
    fetchOnMount: false
  })

  useEffect(() => {
    void fetchData({ ...params, limit, skip })
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
