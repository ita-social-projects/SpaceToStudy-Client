import { screen, fireEvent, waitFor } from '@testing-library/react'
import NavBar from '~/containers/navbar/NavBar'
import { renderWithRouterAndTheme } from '~tests/test-utils'

describe('Sidebar test', () => {
  const navigationItems = [{ label:'label-test', route: '#route-test' }]

  beforeEach(() => {
    renderWithRouterAndTheme(
      <NavBar navigationItems={ navigationItems }>
        <button>children</button>
      </NavBar>
    )
  })

  it('should render logo element', () => {
    const logo = screen.getByAltText('logo')
    
    expect(logo).toBeInTheDocument()
  })
  
  it('should render prop children element', () => {
    const children = screen.getByText('children')
    
    expect(children).toBeInTheDocument()
  })

  it('should render navigation item with label text', () => {
    const text = screen.getByText('header.guestNavBar.label-test')
    
    expect(text).toBeInTheDocument()
  })

  it('should render language icon', () => {
    const languageIcon = screen.getByTestId('LanguageIcon')
    
    expect(languageIcon).toBeInTheDocument()
  })
    
  it('should open sidebar with close icon when click menu icon', async () => {
    const menuIcon = screen.getByTestId('MenuIcon')

    expect(menuIcon).toBeInTheDocument()

    fireEvent.click(menuIcon)
    const closeIcon = screen.getByTestId('CloseIcon')

    await waitFor(() => expect(closeIcon).toBeInTheDocument())
  })
})
