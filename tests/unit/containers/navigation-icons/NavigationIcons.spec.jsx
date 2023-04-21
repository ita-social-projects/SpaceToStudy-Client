import { screen, fireEvent, waitFor } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import NavigationIcons from '~/containers/navigation-icons/NavigationIcons'
import { ModalProvider } from '~/context/modal-context'
import { SnackBarProvider } from '~/context/snackbar-context'
import { vi } from 'vitest'

const setIsSidebarOpen = vi.fn()
vi.mock('~/hooks/use-confirm', () => {
  return {
    default: () => ({ setNeedConfirmation: () => true })
  }
})
vi.mock('~/containers/guest-home-page/google-button/GoogleButton', () => ({
  __esModule: true,
  default: function () {
    return <button>Google</button>
  }
}))

describe('test with guest role', () => {
  const preloadedState = { appMain: { userRole: '' } }
  beforeEach(() => {
    renderWithProviders(
      <SnackBarProvider>
        <ModalProvider>
          <NavigationIcons setSidebarOpen={ setIsSidebarOpen } />
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

    expect(setIsSidebarOpen).toBeCalled()
  })
})

describe('test with student role', () => {
  const preloadedState = { appMain: { userRole: 'student' } }
  beforeEach(() => {
    renderWithProviders(
      <ModalProvider>
        <NavigationIcons setSidebarOpen={ setIsSidebarOpen } />
      </ModalProvider>,
      { preloadedState }
    )
  })

  it('should render message icon', () => {
    const messageIcon = screen.getByTestId('MessageRoundedIcon')

    expect(messageIcon).toBeInTheDocument()
  })
})

describe('test with admin role', () => {
  const preloadedState = { appMain: { userRole: 'admin' } }
  beforeEach(() => {
    renderWithProviders(
      <ModalProvider>
        <NavigationIcons />
      </ModalProvider>,
      { preloadedState }
    )
  })

  it('should render logout icon', () => {
    const logoutIcon = screen.getByTestId('LogoutIcon')

    expect(logoutIcon).toBeInTheDocument()
  })
})
