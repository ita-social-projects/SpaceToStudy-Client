import {
  useState,
  useMemo,
  useLayoutEffect,
  useCallback,
  useEffect
} from 'react'

import useQuery from '~/hooks/use-query'

import { defaultResponses } from '~/constants'
import { ItemsWithCount, ServiceFunctionNew } from '~/types'

interface UseLoadMoreProps<Data, Params> {
  service: ServiceFunctionNew<ItemsWithCount<Data>, Params>
  limit: number
  params?: Params
}

const useLoadMore = <Data, Params>({
  service,
  limit,
  params
}: UseLoadMoreProps<Data, Params>) => {
  const [skip, setSkip] = useState<number>(0)
  const [data, setData] = useState<Data[]>([])
  const [previousLimit, setPreviousLimit] = useState<number>(limit)

  let isFetched = false

  const loadMore = useCallback(
    () => setSkip((prevState) => prevState + limit),
    [limit]
  )

  const handleResponse = useCallback((responseData: ItemsWithCount<Data>) => {
    setData((prevState) => [...prevState, ...responseData.items])
  }, [])

  const resetData = useCallback(() => {
    setSkip(0)
    setData([])
  }, [])

  const { data: response, isFetching: loading } = useQuery({
    queryFn: () => service({ ...params, limit, skip } as Params),
    queryKey: ['load-more', params, limit, skip],
    options: {
      initialData: defaultResponses.itemsWithCount
    }
  })

  useEffect(() => {
    handleResponse(response)
  }, [response, handleResponse])

  useLayoutEffect(() => {
    if (previousLimit !== limit || isFetched) {
      resetData()
      setPreviousLimit(limit)
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      isFetched = true
    }
  }, [limit, previousLimit, resetData, skip, params])

  const isExpandable = useMemo(
    () => data.length < response.count && data.length > 0,
    [data, response]
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
