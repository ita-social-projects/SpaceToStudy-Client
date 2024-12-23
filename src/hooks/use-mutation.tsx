import {
  useMutation as useReactMutation,
  UseMutationOptions,
  UseMutationResult
} from '@tanstack/react-query'

import { ErrorResponse } from '~/types'

const useMutation = <
  TData = unknown,
  TError = ErrorResponse,
  TVariables = void,
  TContext = unknown
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>
): UseMutationResult<TData, TError, TVariables, TContext> => {
  const mutation = useReactMutation<TData, TError, TVariables, TContext>(
    options
  )

  return mutation
}

export default useMutation
