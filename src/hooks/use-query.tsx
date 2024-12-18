import { useQuery as useReactQuery } from '@tanstack/react-query'

type UseQueryProps<TData> = {
  queryKey: string[]
  queryFn: () => Promise<TData>
}

const useQuery = <TData,>({ queryKey, queryFn }: UseQueryProps<TData>) => {
  const { isLoading, error, data, refetch } = useReactQuery<TData>({
    queryKey,
    queryFn
  })

  return { isLoading, error, data, refetch }
}

export default useQuery
