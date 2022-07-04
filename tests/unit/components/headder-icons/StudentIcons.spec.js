import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import StudentIcons from '~/components/header-icons/StudentIcons'

const openLoginDialog = jest.fn()
const setIsSidebarOpen = jest.fn()

describe('test with guest role', () => {

  beforeEach(() => {
    renderWithProviders(<StudentIcons openLoginDialog={ openLoginDialog } setIsSidebarOpen={ setIsSidebarOpen } />)
  })

  it('should render login icon', () => {
    const messagIcon = screen.getByTestId('MessageRoundedIcon')
    
    expect(messagIcon).toBeInTheDocument()
  })

  it('should render click menu icon', () => {
    const menuIcon = screen.getByTestId('MenuIcon')
    fireEvent.click(menuIcon)
    
    expect(setIsSidebarOpen).toBeCalledWith(true)
  })
    
})
