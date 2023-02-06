import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import UserIcons from '~/containers/navigation-icons/user-icons/UserIcons'
import { vi } from 'vitest'

const openLoginDialog = vi.fn()
const setIsSidebarOpen = vi.fn()

describe('test with user role', () => {
  beforeEach(() => {
    renderWithProviders(<UserIcons openLoginDialog={ openLoginDialog } setIsSidebarOpen={ setIsSidebarOpen } />)
  })

  it('should render login icon', () => {
    const messageIcon = screen.getByTestId('MessageRoundedIcon')

    expect(messageIcon).toBeInTheDocument()
  })

  it('should render click menu icon', () => {
    const menuIcon = screen.getByTestId('MenuIcon')
    fireEvent.click(menuIcon)

    expect(setIsSidebarOpen).toBeCalledWith(true)
  })

  it('should render tooltip title', async () => {
    const messageIcon = screen.getByTestId('MessageRoundedIcon')
    fireEvent.mouseOver(messageIcon)
    const messagesTooltipTitle = await screen.findByText('iconsTooltip.messages')

    expect(messagesTooltipTitle).toBeInTheDocument()
  })
  it('should open account menu', async () => {
    const accountMenuIcon = screen.getByTestId('AccountCircleOutlinedIcon')
    fireEvent.click(accountMenuIcon)
    const accountMenuLogout = await screen.findByText('header.logout')

    expect(accountMenuLogout).toBeInTheDocument()
  })
})
