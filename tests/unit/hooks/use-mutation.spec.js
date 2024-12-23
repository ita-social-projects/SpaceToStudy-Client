import { renderHook } from '@testing-library/react-hooks'
import { vi } from 'vitest'

import QueryProvider from '~/QueryProvider'
import useMutation from '~/hooks/use-mutation'

describe('useMutation', () => {
  const mutationFn = vi.fn()

  it('should return pending state initially', () => {
    const { result } = renderHook(() => useMutation({ mutationFn }), {
      wrapper: QueryProvider
    })

    expect(result.current.isIdle).toBe(true)
  })
})
