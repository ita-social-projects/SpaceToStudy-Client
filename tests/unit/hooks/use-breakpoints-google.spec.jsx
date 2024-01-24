import { renderHook } from '@testing-library/react-hooks'
import mediaQuery from 'css-mediaquery'
import { vi } from 'vitest'

import useBreakpointsGoogle from '~/hooks/use-breakpoints-google'

const createMatchMedia = (width) => {
  return (query) => ({
    matches: mediaQuery.match(query, { width }),
    addListener: vi.fn(),
    removeListener: vi.fn()
  })
}

describe('useBreakpointsGoogle custom hook', () => {
  it('should return Small Screen', () => {
    window.matchMedia = createMatchMedia(500)
    const { result } = renderHook(useBreakpointsGoogle)
    expect(result.current.isSmallScreen).toBeTruthy()
  })
  it('should return Medium Screen', () => {
    window.matchMedia = createMatchMedia(700)
    const { result } = renderHook(useBreakpointsGoogle)
    expect(result.current.isMediumScreen).toBeTruthy()
  })
  it('should return Large Screen', () => {
    window.matchMedia = createMatchMedia(1000)
    const { result } = renderHook(useBreakpointsGoogle)
    expect(result.current.isLargeScreen).toBeTruthy()
  })
  it('should return XLarge Screen', () => {
    window.matchMedia = createMatchMedia(1300)
    const { result } = renderHook(useBreakpointsGoogle)
    expect(result.current.isXLargeScreen).toBeTruthy()
  })
})
