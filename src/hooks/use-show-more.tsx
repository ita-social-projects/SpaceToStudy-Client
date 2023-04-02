import { useState, useMemo, useEffect } from 'react'
import { AxiosResponse } from 'axios'

import useAxios from '~/hooks/use-axios'

import { Params } from '~/types'

interface UseShowMoreReturn<T> {
  responseData: T
  loading: boolean
  fetchData: (params: Params) => Promise<AxiosResponse<T>>
  showMore: () => void
  isExpandable: boolean
  limit: number
}

interface UseShowMoreProps<T> {
  service: (params: Params) => Promise<AxiosResponse<T>>
  pageSize: number
  fetchOnMount?: boolean
}

const useShowMore = <T,>({ service, pageSize, fetchOnMount = true }: UseShowMoreProps<T>): UseShowMoreReturn<T> => {
  const [limit, setLimit] = useState<number>(pageSize)

  const showMore = () => {
    setLimit((prevState) => prevState + pageSize)
  }

  const { response, loading, fetchData } = useAxios({ service, fetchOnMount: false })

  useEffect(() => {
    if (fetchOnMount) {
      fetchData({ limit })
    }
  }, [fetchData, fetchOnMount, limit])

  const responseData = useMemo(() => response?.data || [], [response])
  const isExpandable = useMemo(() => limit <= responseData.length, [limit, responseData])

  return { responseData, loading, fetchData, showMore, isExpandable, limit }
}

export default useShowMore
