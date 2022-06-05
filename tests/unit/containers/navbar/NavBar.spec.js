import { screen, fireEvent, waitFor } from '@testing-library/react'
import NavBar from '~/containers/navbar/NavBar'
import { renderWithRouter } from '~tests/test-utils'

describe('Sidebar test', () => {
  const navigationItems = [{ label:'label-test', route: '#route-test' }]

  beforeEach(() => {
    renderWithRouter(
      <NavBar navigationItems={ navigationItems }>
        <button>children</button>
      </NavBar>
    )
  })

  it('should render logo element', () => {
    const logo = screen.getByAltText('logo')
    
    expect(logo).toBeInTheDocument()
  })
  
  it('should render children element', () => {
    const children = screen.getByText('children')
    
    expect(children).toBeInTheDocument()
  })

  it('should render navigation', () => {
    const text = screen.getByText('header.guestNavBar.label-test')
    
    expect(text).toBeInTheDocument()
  })

  it('should render language icon', () => {
    const icon = screen.getByTestId('LanguageIcon')
    
    expect(icon).toBeInTheDocument()
  })
    
  it('should open sidebar with close icon', async () => {
    const menuIcon = screen.getByTestId('MenuIcon')

    expect(menuIcon).toBeInTheDocument()

    fireEvent.click(menuIcon)
    const closeIcon = screen.getByTestId('CloseIcon')

    await waitFor(() => expect(closeIcon).toBeInTheDocument())
  })
})
