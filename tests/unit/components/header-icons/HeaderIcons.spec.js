import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import HeaderIcons from '~/components/header-icons/HeaderIcons'

const openLoginDialog = jest.fn()
const setIsSidebarOpen = jest.fn()

describe('test with guest role', () => {

  const preloadedState = { appMain: { loading: false, userRole: '' } }
  beforeEach(() => {
    renderWithProviders(<HeaderIcons openLoginDialog={ openLoginDialog } setIsSidebarOpen={ setIsSidebarOpen } />, { preloadedState })
  })

  it('should render login icon', () => {
    const loginIcon = screen.getByTestId('LoginIcon')
    
    expect(loginIcon).toBeInTheDocument()
  })
    
  it('should render login button', () => {
    const loginButton = screen.getByText('header.loginButton')
    
    expect(loginButton).toBeInTheDocument()
  })
    
  it('should render click menu icon', () => {
    const menuIcon = screen.getByTestId('MenuIcon')
    fireEvent.click(menuIcon)
    
    expect(setIsSidebarOpen).toBeCalledWith(true)
  })
    
})

describe('test with student role', () => {

  const preloadedState = { appMain: { loading: false, userRole: 'student' } }
  beforeEach(() => {
    renderWithProviders(<HeaderIcons openLoginDialog={ openLoginDialog } setIsSidebarOpen={ setIsSidebarOpen } />, { preloadedState })
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

describe('test with loading equal true', () => {

  const preloadedState = { appMain: { loading: true, userRole: 'student' } }
  beforeEach(() => {
    renderWithProviders(<HeaderIcons openLoginDialog={ openLoginDialog } setIsSidebarOpen={ setIsSidebarOpen } />, { preloadedState })
  })

  it('should render loader', () => {
    const loader = screen.getByTestId('loader')

    expect(loader).toBeInTheDocument()
  })
    
})

