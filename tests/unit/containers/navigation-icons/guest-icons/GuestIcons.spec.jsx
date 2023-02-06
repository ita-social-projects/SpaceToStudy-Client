import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import GuestIcons from '~/containers/navigation-icons/guest-icons/GuestIcons'
import { vi } from 'vitest'

const openLoginDialog = vi.fn()
const setIsSidebarOpen = vi.fn()

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

  it('should render tooltip title', async () => {
    const loginIcon = screen.getByTestId('LoginIcon')
    fireEvent.mouseOver(loginIcon)
    const loginTooltipTitle = await screen.findByText('iconsTooltip.login')

    expect(loginTooltipTitle).toBeInTheDocument()
  })
})
