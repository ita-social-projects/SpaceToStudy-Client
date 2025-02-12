import type { QueryObserverResult } from '@tanstack/react-query'
import type { ResponseError } from '~/exceptions'

export type QueryRefetch<T, E = ResponseError> = () => Promise<
  QueryObserverResult<T, E>
>
