import { vi } from 'vitest'
import GuestHomePage from '~/pages/guest-home-page/GuestHome'
import { renderWithProviders } from '~tests/test-utils'

const mockSetModal = vi.fn()
const mockGet = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useSearchParams: () => [{ get: mockGet }, vi.fn()]
  }
})

vi.mock('~/context/modal-context', async () => {
  const actual = await vi.importActual('~/context/modal-context')
  return {
    ...actual,
    useModalContext: () => ({
      closeModal: mockSetModal,
      openModal: mockSetModal
    })
  }
})

describe('GuestHomePage test', () => {
  it('should render without opening login modal', () => {
    const defaultRoute = '/'
    mockGet.mockReturnValue(null)
    renderWithProviders(<GuestHomePage />, { initialEntries: defaultRoute })
    expect(mockSetModal).not.toBeCalled()
  })
  it('should open login modal when login query in url', () => {
    const routeWithSeaechParam = '/?login'
    mockGet.mockReturnValue(true)
    renderWithProviders(<GuestHomePage />, {
      initialEntries: routeWithSeaechParam
    })
    expect(mockSetModal).toBeCalled()
  })
})
