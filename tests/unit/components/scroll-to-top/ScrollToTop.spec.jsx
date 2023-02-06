import { renderWithProviders } from '~tests/test-utils'
import ScrollToTop from '~/components/scroll-to-top/ScrollToTop'
import { vi } from 'vitest'

describe('ScrollToTop dialog test', () => {
  window.scrollTo = vi.fn()

  beforeEach(() => {
    renderWithProviders(<ScrollToTop />)
  })

  it('should show ArrowUpwardRoundedIcon', () => {
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
  })
})
