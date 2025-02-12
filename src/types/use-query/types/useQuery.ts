import { QueryObserverResult } from '@tanstack/react-query'
import { ResponseError } from '~/exceptions'

export type QueryRefetch<T, E = ResponseError> = () => Promise<
  QueryObserverResult<T, E>
>
