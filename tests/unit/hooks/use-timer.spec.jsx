import { renderHook, act } from '@testing-library/react'
import { vi } from 'vitest'

import useTimer from '~/hooks/use-timer'

describe('useTimer', () => {
  const initialTime = 60000

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.resetAllMocks()
  })

  it('should initialize with the given initial time', () => {
    const { result } = renderHook(() => useTimer(initialTime))

    expect(result.current).toBe('00:01:00')
  })

  it('should decrement time every second', () => {
    const { result } = renderHook(() => useTimer(initialTime))

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(result.current).toBe('00:00:59')
  })

  it('should clear interval on unmount', () => {
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval')

    const { unmount } = renderHook(() => useTimer(initialTime))

    unmount()

    expect(clearIntervalSpy).toHaveBeenCalled()
  })
})
