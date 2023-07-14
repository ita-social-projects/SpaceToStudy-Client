import { useCallback, useEffect, useMemo, useState } from 'react'

import useAxios from '~/hooks/use-axios'

import { defaultResponses } from '~/constants'

const useLoadMore = ({ service, limit, params }) => {
  const [skip, setSkip] = useState(0)
  const [data, setData] = useState([])
  const [previousLimit, setPreviousLimit] = useState(limit)

  const loadMore = useCallback(
    () => setSkip((prevState) => prevState + limit),
    [limit]
  )

  const handleResponse = useCallback(
    (data) => setData((prevState) => [...prevState, ...data.items]),
    []
  )

  const resetData = useCallback(() => {
    setSkip(0)
    setData([])
  }, [])

  const { response, loading, fetchData } = useAxios({
    service,
    defaultResponse: defaultResponses.itemsWithCount,
    fetchOnMount: false,
    onResponse: handleResponse
  })

  useEffect(() => {
    if (previousLimit === limit) {
      void fetchData({ ...params, limit, skip })
    } else {
      resetData()
      setPreviousLimit(limit)
    }
  }, [fetchData, limit, previousLimit, resetData, skip, params])

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
