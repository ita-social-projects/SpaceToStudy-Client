import { renderHook, act } from '@testing-library/react-hooks'
import { vi } from 'vitest'

import { queryClient } from '~/plugins/queryClient'
import QueryProvider from '~/QueryProvider'
import useMutation from '~/hooks/use-mutation'

describe('useMutation', () => {
  const mutationFn = vi.fn().mockResolvedValue('data')
  const onSuccess = vi.fn()
  const invalidateQueriesSpy = vi.spyOn(queryClient, 'invalidateQueries')

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should call onSuccess if provided', async () => {
    const { result } = renderHook(
      () =>
        useMutation({
          mutationFn,
          onSuccess
        }),
      { wrapper: QueryProvider }
    )

    await act(() => result.current.mutateAsync())

    expect(mutationFn).toHaveBeenCalled()
    expect(onSuccess).toHaveBeenCalled()
  })

  it('should call invalidateQueries if queryKey is provided', async () => {
    const queryKey = ['testKey']

    const { result } = renderHook(
      () =>
        useMutation({
          mutationFn,
          queryKey
        }),
      { wrapper: QueryProvider }
    )

    await act(() => result.current.mutateAsync())

    expect(mutationFn).toHaveBeenCalled()
    expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey })
  })

  it('should call invalidateQueries for each queryKey if queryKeys is provided', async () => {
    const queryKeys = [['testKey1'], ['testKey2']]

    const { result } = renderHook(
      () =>
        useMutation({
          mutationFn,
          queryKeys
        }),
      { wrapper: QueryProvider }
    )

    await act(() => result.current.mutateAsync())

    expect(mutationFn).toHaveBeenCalled()
    expect(invalidateQueriesSpy).toHaveBeenCalledWith({
      queryKey: queryKeys[0]
    })
    expect(invalidateQueriesSpy).toHaveBeenCalledWith({
      queryKey: queryKeys[1]
    })
  })

  it('should not call invalidateQueries if queryKey or queryKeys are not provided', async () => {
    const { result } = renderHook(
      () =>
        useMutation({
          mutationFn
        }),
      { wrapper: QueryProvider }
    )

    await act(() => result.current.mutateAsync())

    expect(mutationFn).toHaveBeenCalled()
    expect(invalidateQueriesSpy).not.toHaveBeenCalled()
  })
})
