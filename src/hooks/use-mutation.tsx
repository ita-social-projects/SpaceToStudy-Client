import {
  useMutation as useReactMutation,
  type UseMutationOptions,
  type UseMutationResult
} from '@tanstack/react-query'
import { type AxiosResponse } from 'axios'

import { ErrorResponse } from '~/types'
import { handleAxiosResponse } from '~/utils/handle-axios-response'

const useMutation = <
  TData = unknown,
  TError = ErrorResponse,
  TVariables = void,
  TContext = unknown
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>
): UseMutationResult<TData, TError, TVariables, TContext> => {
  const mutation = useReactMutation<TData, TError, TVariables, TContext>({
    ...options,
    mutationFn: async (variables: TVariables) => {
      const response = (await options.mutationFn!(variables)) as Promise<
        AxiosResponse<TData>
      >

      return handleAxiosResponse(response)
    }
  })

  return mutation
}

export default useMutation
