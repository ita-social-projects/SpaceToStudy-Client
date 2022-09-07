import { renderHook } from '@testing-library/react-hooks'
import mediaQuery from 'css-mediaquery'

import useBreakpoints from '~/hooks/use-breakpoints'

const createMatchMedia = (width) => {
  return (query) => ({
    matches: mediaQuery.match(query, { width }),
    addListener: jest.fn(),
    removeListener: jest.fn()
  })
}

describe('useBreakpoints custom hook', () => {
  it('should return correct value for desktop', () => {
    window.matchMedia = createMatchMedia(1444)

    const { result } = renderHook(useBreakpoints)

    expect(result.current.isDesktop).toBeTruthy()
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
