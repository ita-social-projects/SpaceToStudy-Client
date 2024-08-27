import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import UserIcons from '~/containers/navigation-icons/user-icons/UserIcons'
import { vi } from 'vitest'

const openLoginDialog = vi.fn()
const setIsSidebarOpen = vi.fn()

vi.mock('~/containers/navigation-icons/AccountIcon', () => ({
  default: function () {
    return <button>AccountIcon</button>
  }
}))

describe('test with user role', () => {
  const preloadedState = { appMain: { loading: false, userRole: 'student' } }

  beforeEach(() => {
    renderWithProviders(
      <UserIcons
        openLoginDialog={openLoginDialog}
        setSidebarOpen={setIsSidebarOpen}
      />,
      { preloadedState }
    )
  })

  it('should render login icon', () => {
    const messageIcon = screen.getByTestId('MessageRoundedIcon')

    expect(messageIcon).toBeInTheDocument()
  })

  it('should render click menu icon', () => {
    const menuIcon = screen.getByTestId('MenuIcon')
    fireEvent.click(menuIcon)

    expect(setIsSidebarOpen).toBeCalled()
  })

  it('should render tooltip title', async () => {
    const messageIcon = screen.getByTestId('MessageRoundedIcon')
    fireEvent.mouseOver(messageIcon)
    const messagesTooltipTitle = await screen.findByText(
      'iconsTooltip.messages'
    )

    expect(messagesTooltipTitle).toBeInTheDocument()
  })

  it('should render account menu icon', async () => {
    const accountMenuIcon = await screen.findByText('AccountIcon')
    expect(accountMenuIcon).toBeInTheDocument()
  })
})
