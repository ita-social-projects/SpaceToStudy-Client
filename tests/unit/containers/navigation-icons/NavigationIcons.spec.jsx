import { screen, fireEvent, waitFor } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import NavigationIcons from '~/containers/navigation-icons/NavigationIcons'
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
    renderWithProviders(<NavigationIcons setSidebarOpen={setIsSidebarOpen} />, {
      preloadedState
    })
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
  beforeEach(async () => {
    await waitFor(() => {
      renderWithProviders(
        <NavigationIcons setSidebarOpen={setIsSidebarOpen} />,
        {
          preloadedState
        }
      )
    })
  })

  it('should render message icon', () => {
    const messageIcon = screen.getByTestId('MessageRoundedIcon')

    expect(messageIcon).toBeInTheDocument()
  })
})
