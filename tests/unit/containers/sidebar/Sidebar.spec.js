import { screen, fireEvent, waitFor } from '@testing-library/react'
import Sidebar from '~/containers/sidebar/Sidebar'
import { renderWithRouterAndTheme } from '~tests/test-utils'

describe('Sidebar test', () => {
  const isSidebarOpen = true
  const sidebarActive = jest.fn()
  const navigationItems = [{ label: 'label-test', route: '/#route-test' }]
    
  beforeEach(() => {
    renderWithRouterAndTheme(
      <Sidebar isSidebarOpen={ isSidebarOpen } navigationItems={ navigationItems } sidebarActive={ sidebarActive } />
    )
  })

  it('should render navigation item with label text', () => {
    const text = screen.getByText('header.guestNavBar.label-test')
    
    expect(text).toBeInTheDocument()
  })
    
  it('should render link and call closeSidebar onClick link', async () => {
    const linkElement = screen.getByRole('link')
    expect(linkElement).toHaveAttribute('href', '/#route-test')
    
    fireEvent.click(linkElement)
    await waitFor(() => expect(sidebarActive).toHaveBeenCalled())
  })
    
  it('should call closeSidebar onClick button', async () => {
    const closeButton = screen.getByRole('button')
    fireEvent.click(closeButton)

    await waitFor(() => expect(sidebarActive).toHaveBeenCalled())
  })
})
