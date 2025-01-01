import {
  useMutation as useReactMutation,
  type QueryKey,
  type UseMutationOptions,
  type UseMutationResult
} from '@tanstack/react-query'

import { queryClient } from '~/plugins/queryClient'
import { type ErrorResponse } from '~/types'

type UseMutationProps<TData, TError, TVariables, TContext> = {
  queryKey?: QueryKey
} & UseMutationOptions<TData, TError, TVariables, TContext>

const useMutation = <
  TData = unknown,
  TError = ErrorResponse,
  TVariables = void,
  TContext = unknown
>({
  queryKey,
  ...mutationOptions
}: UseMutationProps<TData, TError, TVariables, TContext>): UseMutationResult<
  TData,
  TError,
  TVariables,
  TContext
> => {
  const mutation = useReactMutation<TData, TError, TVariables, TContext>({
    ...mutationOptions,
    onSuccess: async (...args) => {
      if (mutationOptions.onSuccess) {
        await mutationOptions.onSuccess(...args)
      }
      if (queryKey) {
        await queryClient.invalidateQueries({ queryKey })
      }
    }
  })

  return mutation
}

export default useMutation
