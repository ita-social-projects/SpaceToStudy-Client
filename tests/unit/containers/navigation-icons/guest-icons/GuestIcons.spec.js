import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import GuestIcons from '~/containers/navigation-icons/guest-icons/GuestIcons'

const openLoginDialog = jest.fn()
const setIsSidebarOpen = jest.fn()

describe('test with guest role', () => {
  beforeEach(() => {
    renderWithProviders(<GuestIcons openLoginDialog={ openLoginDialog } setIsSidebarOpen={ setIsSidebarOpen } />)
  })

  it('should render login icon', () => {
    const loginIcon = screen.getByTestId('LoginIcon')
    fireEvent.click(loginIcon)

    expect(openLoginDialog).toBeCalled()
  })

  it('should render login button', () => {
    const loginButton = screen.getByText('header.loginButton')
    fireEvent.click(loginButton)

    expect(openLoginDialog).toBeCalled()
  })

  it('should render click menu icon', () => {
    const menuIcon = screen.getByTestId('MenuIcon')
    fireEvent.click(menuIcon)

    expect(setIsSidebarOpen).toBeCalledWith(true)
  })
})
