import { debounce } from '~/utils/debounce'

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.clearAllTimers()
  })

  it('should debounce the function and execute it after the wait time', () => {
    const mockFn = vi.fn()
    const debouncedFn = debounce(mockFn, 300)

    debouncedFn()
    debouncedFn()
    debouncedFn()

    vi.advanceTimersByTime(200)

    expect(mockFn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(100)

    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('should reset the timer if called again within the wait time', () => {
    const mockFn = vi.fn()
    const debouncedFn = debounce(mockFn, 300)

    debouncedFn()
    vi.advanceTimersByTime(100)
    debouncedFn()

    vi.advanceTimersByTime(200)

    expect(mockFn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(100)

    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('should pass the correct arguments to the debounced function', () => {
    const mockFn = vi.fn()
    const debouncedFn = debounce(mockFn, 300)

    debouncedFn('arg1', 'arg2')
    vi.advanceTimersByTime(300)

    expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2')
  })
})
