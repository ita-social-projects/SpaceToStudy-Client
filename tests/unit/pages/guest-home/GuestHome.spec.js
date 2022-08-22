import { renderWithProviders } from '~tests/test-utils'
import { ModalProvider } from '~/context/modal-context'
import GuestHomePage from '~/pages/guest-home-page/GuestHome'

const mockSetModal = jest.fn()

describe('GuestHomePage test', () => {
  it('should render without opening login modal', () => {
    const defaultRoute = '/'
    renderWithProviders(
      <ModalProvider value={ { setModal: mockSetModal } }>
        <GuestHomePage />
      </ModalProvider>,
      { initialEntries: defaultRoute }
    )
    expect(mockSetModal).not.toBeCalled()
  })
  it('shoud open login modal when login query in url', () => {
    const routeWithSeaechParam = '/?login'
    renderWithProviders(
      <ModalProvider value={ { setModal: mockSetModal } }>
        <GuestHomePage />
      </ModalProvider>,
      { initialEntries: routeWithSeaechParam }
    )
    expect(mockSetModal).toBeCalled()
  })
})
