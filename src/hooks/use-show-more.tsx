import { Dispatch, SetStateAction, useMemo } from 'react'

const useShowMore = <T,>(
  limit: number,
  increaseCount: number,
  setLimit: Dispatch<SetStateAction<number>>,
  loading: boolean,
  response: { data: T[] }
) => {
  const isExpandable = useMemo(() => !loading && limit <= response.data.length, [limit, loading, response])

  const showMore = () => {
    setLimit((prevState) => prevState + increaseCount)
  }

  return { isExpandable, showMore }
}

export default useShowMore
