import { renderHook } from '@testing-library/react-hooks'
import mediaQuery from 'css-mediaquery'
import { vi } from 'vitest'

import useBreakpoints from '~/hooks/use-breakpoints'

const createMatchMedia = (width) => {
  return (query) => ({
    matches: mediaQuery.match(query, { width }),
    addListener: vi.fn(),
    removeListener: vi.fn()
  })
}

describe('useBreakpoints custom hook', () => {
  it('should return correct value for desktop', () => {
    window.matchMedia = createMatchMedia(1444)

    const { result } = renderHook(useBreakpoints)

    expect(result.current.isLaptopAndAbove).toBeTruthy()
  })

  it('should return correct value for tablet', () => {
    window.matchMedia = createMatchMedia(768)

    const { result } = renderHook(useBreakpoints)

    expect(result.current.isTablet).toBeTruthy()
  })

  it('should return correct value for mobile', () => {
    window.matchMedia = createMatchMedia(375)

    const { result } = renderHook(useBreakpoints)

    expect(result.current.isMobile).toBeTruthy()
  })
})
