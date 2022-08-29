import { screen, fireEvent, waitFor } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import NavigationIcons from '~/containers/navigation-icons/NavigationIcons'
import { ModalProvider } from '~/context/modal-context'
import { SnackBarProvider } from '~/context/snackbar-context'

const setIsSidebarOpen = jest.fn()
jest.mock('~/hooks/use-confirm', () => {
  return () => ({
    setNeedConfirmation: () => true
  })
})

describe('test with guest role', () => {
  const preloadedState = { appMain: { loading: false, userRole: '' } }
  beforeEach(() => {
    renderWithProviders(
      <SnackBarProvider>
        <ModalProvider>
          <NavigationIcons setIsSidebarOpen={ setIsSidebarOpen } />
        </ModalProvider>
      </SnackBarProvider>,
      { preloadedState }
    )
  })

  it('should open login popup after click', async () => {
    const loginButton = screen.getByText('header.loginButton')
    fireEvent.click(loginButton)
    const img = screen.getByAltText('login')

    await waitFor(() => expect(img).toBeInTheDocument())
  })

  it('should render and click menu icon', () => {
    const menuIcon = screen.getByTestId('MenuIcon')
    fireEvent.click(menuIcon)

    expect(setIsSidebarOpen).toBeCalledWith(true)
  })
})

describe('test with student role', () => {
  const preloadedState = { appMain: { loading: false, userRole: 'student' } }
  beforeEach(() => {
    renderWithProviders(
      <ModalProvider>
        <NavigationIcons setIsSidebarOpen={ setIsSidebarOpen } />
      </ModalProvider>,
      { preloadedState }
    )
  })

  it('should render message icon', () => {
    const messageIcon = screen.getByTestId('MessageRoundedIcon')

    expect(messageIcon).toBeInTheDocument()
  })
})

describe('test with loading equal true', () => {
  const preloadedState = { appMain: { loading: true, userRole: 'student' } }
  beforeEach(() => {
    renderWithProviders(
      <ModalProvider>
        <NavigationIcons setIsSidebarOpen={ setIsSidebarOpen } />
      </ModalProvider>,
      { preloadedState }
    )
  })

  it('should render loader', () => {
    const loader = screen.getByTestId('loader')

    expect(loader).toBeInTheDocument()
  })
})
