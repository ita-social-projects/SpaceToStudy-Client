import { renderWithProviders } from '~tests/test-utils'
import ScrollToTop from '~/components/scroll-to-top/ScrollToTop'
import { vi } from 'vitest'

const mockScrollTo = vi.fn()
const element = { current: { scrollTo: mockScrollTo } }

describe('ScrollToTop dialog test', () => {
  beforeEach(() => {
    renderWithProviders(<ScrollToTop element={element} />)
  })

  it('should show ArrowUpwardRoundedIcon', () => {
    expect(mockScrollTo).toHaveBeenCalledWith(0, 0)
  })
})
