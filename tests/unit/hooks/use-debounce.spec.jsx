import { renderHook, act } from '@testing-library/react'
import { vi } from 'vitest'

import { useDebounce } from '~/hooks/use-debounce'

const testValueOne = 'test1'
const testValueTwo = 'test2'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should call the callback after a delay', () => {
    const callback = vi.fn()
    const delay = 500
    const { result } = renderHook(() => useDebounce(callback, delay))

    act(() => {
      result.current(testValueOne)
      vi.advanceTimersByTime(delay - 1)
    })
    expect(callback).not.toBeCalled()

    act(() => {
      vi.advanceTimersByTime(1)
    })
    expect(callback).toBeCalledWith(testValueOne)
  })

  it('should cancel the previous timer when called again', () => {
    const callback = vi.fn()
    const delay = 500
    const { result } = renderHook(() => useDebounce(callback, delay))

    act(() => {
      result.current(testValueOne)
      vi.advanceTimersByTime(delay / 2)
      result.current(testValueTwo)
      vi.advanceTimersByTime(delay / 2)
    })
    expect(callback).not.toBeCalled()

    act(() => {
      vi.advanceTimersByTime(delay / 2)
    })
    expect(callback).toBeCalledWith(testValueTwo)
  })
})
