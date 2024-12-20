import {
  useQuery as useReactQuery,
  UseQueryOptions
} from '@tanstack/react-query'
import { AxiosError } from 'axios'

interface UseQueryProps<
  TQueryFnData,
  TError,
  TData,
  TQueryKey extends unknown[]
> {
  queryKey: TQueryKey
  queryFn: () => Promise<TQueryFnData>
  options?: UseQueryOptions<TQueryFnData, TError, TData>
}

const useQuery = <
  TQueryFnData,
  TError = AxiosError,
  TData = TQueryFnData,
  TQueryKey extends unknown[] = []
>({
  queryKey,
  queryFn,
  options
}: UseQueryProps<TQueryFnData, TError, TData, TQueryKey>) => {
  const { isLoading, error, data, refetch } = useReactQuery<
    TQueryFnData,
    TError,
    TData
  >({
    queryKey,
    queryFn,
    ...options
  })

  return { isLoading, error, data, refetch }
}

export default useQuery
