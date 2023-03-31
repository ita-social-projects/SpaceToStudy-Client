import { Dispatch, SetStateAction, useMemo } from 'react'

interface UseShowMoreProps<T> {
  limit: number,
  increaseCount: number,
  setLimit: Dispatch<SetStateAction<number>>,
  loading: boolean,
  response: { data: T[] }
}

const useShowMore = <T,>({ limit, increaseCount, setLimit, loading, response }: UseShowMoreProps<T>) => {
  const isExpandable = useMemo(() => !loading && limit <= response.data.length, [limit, loading, response])

  const showMore = () => {
    setLimit((prevState) => prevState + increaseCount)
  }

  return { isExpandable, showMore }
}

export default useShowMore
