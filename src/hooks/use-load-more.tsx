import { useState, useMemo, useEffect } from 'react'
import { AxiosResponse } from 'axios'

import useAxios from '~/hooks/use-axios'

import { Params } from '~/types'

interface UseLoadMoreReturn<T> {
  data: T
  loading: boolean
  fetchData: (params: Params) => Promise<AxiosResponse<T>>
  loadMore: () => void
  isExpandable: boolean
  limit: number
}

interface UseLoadMoreProps<T> {
  service: (params: Params) => Promise<AxiosResponse<T>>
  pageSize: number
  fetchOnMount?: boolean
}

const useLoadMore = <T,>({ service, pageSize, fetchOnMount = true }: UseLoadMoreProps<T>): UseLoadMoreReturn<T> => {
  const [limit, setLimit] = useState<number>(pageSize)

  const loadMore = () => {
    setLimit((prevState) => prevState + pageSize)
  }

  const { data, loading, fetchData } = useAxios({ service, fetchOnMount: false })

  useEffect(() => {
    if (fetchOnMount) {
      fetchData({ limit })
    }
  }, [fetchData, fetchOnMount, limit])

  const isExpandable = useMemo(() => limit <= data.length, [limit, data])

  return { data, loading, fetchData, loadMore, isExpandable, limit }
}

export default useLoadMore
