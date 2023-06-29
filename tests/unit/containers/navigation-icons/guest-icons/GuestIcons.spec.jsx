import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import GuestIcons from '~/containers/navigation-icons/guest-icons/GuestIcons'
import { vi } from 'vitest'

const setIsSidebarOpen = vi.fn()

describe('test with guest role', () => {
  beforeEach(() => {
    renderWithProviders(<GuestIcons setSidebarOpen={setIsSidebarOpen} />)
  })

  it('should render click menu icon', () => {
    const menuIcon = screen.getByTestId('MenuIcon')
    fireEvent.click(menuIcon)

    expect(setIsSidebarOpen).toBeCalled()
  })

  it('should render tooltip title', async () => {
    const loginIcon = screen.getByTestId('LoginIcon')
    fireEvent.mouseOver(loginIcon)
    const loginTooltipTitle = await screen.findByText('iconsTooltip.login')

    expect(loginTooltipTitle).toBeInTheDocument()
  })
})
