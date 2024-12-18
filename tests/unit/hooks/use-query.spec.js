import { renderHook } from '@testing-library/react-hooks'
import { vi } from 'vitest'

import QueryProvider from '~/QueryProvider'
import useQuery from '~/hooks/use-query'

describe('useQuery', () => {
  const queryKey = ['testKey']
  const queryFn = vi.fn()

  it('should return loading state initially', () => {
    const { result } = renderHook(() => useQuery({ queryKey, queryFn }), {
      wrapper: QueryProvider
    })

    expect(result.current.isLoading).toBe(true)
  })
})
