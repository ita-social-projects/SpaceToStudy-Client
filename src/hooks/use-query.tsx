import {
  type DefinedInitialDataOptions,
  type DefinedUseQueryResult,
  type QueryKey,
  type UndefinedInitialDataOptions,
  type UseQueryOptions,
  type UseQueryResult,
  useQuery as useReactQuery
} from '@tanstack/react-query'

import { type ResponseError } from '~/exceptions'

type RequiredQueryOptions = 'queryFn' | 'queryKey'
type OptionalQueryOptions = 'enabled' | 'initialData' | 'select' | 'staleTime'
type ReturningQueryParams =
  | 'data'
  | 'error'
  | 'isError'
  | 'isFetching'
  | 'isLoading'
  | 'refetch'

type RequiredQueryProperties<
  TQueryFnData,
  TError = ResponseError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> = Required<
  Pick<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    RequiredQueryOptions
  >
>

type Properties<
  TQueryFnData,
  TError = ResponseError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> = {
  options?: Pick<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    OptionalQueryOptions
  >
} & RequiredQueryProperties<TQueryFnData, TError, TData, TQueryKey>

type DefaultUseQueryResult<TData, TError> = Pick<
  UseQueryResult<TData, TError>,
  ReturningQueryParams
>

type UseQueryResultWithInitialData<TData, TError> = Pick<
  DefinedUseQueryResult<TData, TError>,
  ReturningQueryParams
>

function useQuery<
  TQueryFnData,
  TError = ResponseError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  properties: {
    options: Pick<
      DefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>,
      OptionalQueryOptions
    >
  } & RequiredQueryProperties<TQueryFnData, TError, TData, TQueryKey>
): UseQueryResultWithInitialData<TData, TError>

function useQuery<
  TQueryFnData,
  TError = ResponseError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  properties: {
    options: Pick<
      UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>,
      OptionalQueryOptions
    >
  } & RequiredQueryProperties<TQueryFnData, TError, TData, TQueryKey>
): DefaultUseQueryResult<TData, TError>

function useQuery<
  TQueryFnData,
  TError = ResponseError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  properties: RequiredQueryProperties<TQueryFnData, TError, TData, TQueryKey>
): DefaultUseQueryResult<TData, TError>

function useQuery<
  TQueryFnData,
  TError = ResponseError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  properties: Properties<TQueryFnData, TError, TData, TQueryKey>
): DefaultUseQueryResult<TData, TError> {
  const { options, queryFn, queryKey } = properties

  const { data, error, isError, isFetching, isLoading, refetch } =
    useReactQuery<TQueryFnData, TError, TData, TQueryKey>({
      queryFn,
      queryKey,
      ...options
    })

  return { data, error, isError, isFetching, isLoading, refetch }
}

export default useQuery
