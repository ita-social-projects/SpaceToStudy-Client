import { renderWithProviders } from '~tests/test-utils'
import { ModalProvider } from '~/context/modal-context'
import GuestHomePage from '~/pages/guest-home-page/GuestHome'

const mockSetModal = jest.fn()
let mockSearch = ''

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    search: mockSearch
  })
}))

describe('GuestHomePage test', () => {
  it('should render without opening login modal', () => {
    renderWithProviders(
      <ModalProvider value={{ setModal: mockSetModal }}>
        <GuestHomePage />
      </ModalProvider>
    )
    expect(mockSetModal).not.toBeCalled()
  })
  it('shoud open login modal when login query in url ', () => {
    mockSearch = '?login'
    renderWithProviders(
      <ModalProvider value={{ setModal: mockSetModal }}>
        <GuestHomePage />
      </ModalProvider>
    )
    expect(mockSetModal).toBeCalled()
  })
})