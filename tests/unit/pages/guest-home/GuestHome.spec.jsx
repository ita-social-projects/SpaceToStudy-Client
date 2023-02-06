import { renderWithProviders } from '~tests/test-utils'
import { ModalProvider } from '~/context/modal-context'
import GuestHomePage from '~/pages/guest-home-page/GuestHome'
import { vi } from 'vitest'

const mockSetModal = vi.fn()

describe('GuestHomePage test', () => {
  it('should render without opening login modal', () => {
    const defaultRoute = '/'
    renderWithProviders(
      <ModalProvider value={ { openModal: mockSetModal } }>
        <GuestHomePage />
      </ModalProvider>,
      { initialEntries: defaultRoute }
    )
    expect(mockSetModal).not.toBeCalled()
  })
  it('shoud open login modal when login query in url', () => {
    const routeWithSeaechParam = '/?login'
    renderWithProviders(
      <ModalProvider value={ { openModal: mockSetModal } }>
        <GuestHomePage />
      </ModalProvider>,
      { initialEntries: routeWithSeaechParam }
    )
    expect(mockSetModal).toBeCalled()
  })
})
