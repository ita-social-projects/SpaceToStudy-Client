import { useState, useMemo, useEffect, useCallback } from 'react'
import { AxiosResponse } from 'axios'

import useAxios from '~/hooks/use-axios'

import { Params } from '~/types'

interface useLoadMoreReturn<T> {
  data: T[]
  loading: boolean
  fetchData: (params: Params) => Promise<AxiosResponse<T[]>>
  resetData: () => void
  loadMore: () => void
  isExpandable: boolean
  limit: number
  skip: number
}

interface useLoadMoreProps<T> {
  service: (params: Params) => Promise<AxiosResponse<T[]>>
  limit: number
  fetchOnMount?: boolean
}

const useLoadMore = <T,>({ service, limit, fetchOnMount = true }: useLoadMoreProps<T>): useLoadMoreReturn<T> => {
  const [skip, setSkip] = useState<number>(0)
  const [data, setData] = useState<T[] | []>([])

  const loadMore = useCallback(() => setSkip((prevState) => prevState + limit), [limit])

  const resetData = useCallback(() => {
    setSkip(0)
    setData([])
  }, [])

  const { response, loading, fetchData } = useAxios({ service, defaultResponse: [], fetchOnMount: false })

  useEffect(() => {
    fetchOnMount && fetchData({ limit, skip })
  }, [fetchData, fetchOnMount, limit, skip])

  useEffect(() => {
    response.length && setData((prevState) => [...prevState, ...response])
  }, [response])

  const isExpandable = useMemo(() => limit <= response.length, [limit, response])

  return { data, loading, fetchData, resetData, loadMore, isExpandable, limit, skip }
}

export default useLoadMore
