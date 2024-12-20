import {
  useQuery as useReactQuery,
  QueryKey,
  UseQueryOptions
} from '@tanstack/react-query'
import { ErrorResponse } from '~/types'

interface UseQueryProps<TData, TError, TSelect> {
  queryKey: QueryKey
  queryFn: () => Promise<TData>
  options?: UseQueryOptions<TData, TError, TSelect>
}

const useQuery = <TData, TError = ErrorResponse, TSelect = TData>({
  queryKey,
  queryFn,
  options
}: UseQueryProps<TData, TError, TSelect>) => {
  const query = useReactQuery<TData, TError, TSelect>({
    queryKey,
    queryFn,
    ...options
  })

  return query
}

export default useQuery
