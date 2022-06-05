import { screen, render, fireEvent, waitFor } from '@testing-library/react'
import Sidebar from '~/containers/sidebar/Sidebar'


describe('Sidebar test', () => {
  const isOpen = true
  const setIsOpen = jest.fn()
  const navigationItems = [{ label: 'label', route: '#route' }]
    
  beforeEach(() => {
    render(
      <Sidebar isOpen={ isOpen } navigationItems={ navigationItems } setIsOpen={ setIsOpen } />
    )
  })

  it('should render element with label text', () => {
    const text = screen.getByText('header.guestNavBar.label')
    
    expect(text).toBeInTheDocument()
  })
    
  it('should render link and call setIsOpen onClick link', async () => {
    const linkElement = screen.getByRole('link')
    expect(linkElement).toHaveAttribute('href', '#route')
    
    fireEvent.click(linkElement)
    await waitFor(() => expect(setIsOpen).toHaveBeenCalled())
  })
    
  it('should call setIsOpen onClick button', async () => {
    const closeButton = screen.getByRole('button')
    fireEvent.click(closeButton)

    await waitFor(() => expect(setIsOpen).toHaveBeenCalled())
  })
})
