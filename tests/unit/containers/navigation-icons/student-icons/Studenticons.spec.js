import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import StudentIcons from '~/containers/navigation-icons/student-icons/StudentIcons'

const openLoginDialog = jest.fn()
const setIsSidebarOpen = jest.fn()

describe('test with guest role', () => {
  beforeEach(() => {
    renderWithProviders(<StudentIcons openLoginDialog={ openLoginDialog } setIsSidebarOpen={ setIsSidebarOpen } />)
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
