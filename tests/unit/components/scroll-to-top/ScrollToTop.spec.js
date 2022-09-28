import { renderWithProviders } from '~tests/test-utils'
import ScrollToTop from '~/components/scroll-to-top/ScrollToTop'

describe('ScrollToTop dialog test', () => {
  window.scrollTo = jest.fn()

  beforeEach(() => {
    renderWithProviders(<ScrollToTop />)
  })

  it('should show ArrowUpwardRoundedIcon', () => {
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
  })
})
