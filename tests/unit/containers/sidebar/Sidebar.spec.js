import { screen, fireEvent, waitFor } from '@testing-library/react'
import Sidebar from '~/containers/layout/sidebar/Sidebar'
import { renderWithProviders } from '~tests/test-utils'

describe('Sidebar test', () => {
  const isSidebarOpen = true
  const setIsSidebarOpen = jest.fn()
  const navigationItems = [{ label: 'label-test', route: '/#route-test' }]

  beforeEach(() => {
    renderWithProviders(
      <Sidebar isSidebarOpen={ isSidebarOpen } navigationItems={ navigationItems } setIsSidebarOpen={ setIsSidebarOpen } />
    )
  })

  it('should render navigation item with label text', () => {
    const text = screen.getByText('header.label-test')

    expect(text).toBeInTheDocument()
  })

  it('should render link and call setIsSidebarOpen with false after click link', async () => {
    const linkElement = screen.getByRole('link')
    expect(linkElement).toHaveAttribute('href', '/#route-test')

    fireEvent.click(linkElement)
    await waitFor(() => expect(setIsSidebarOpen).toHaveBeenCalledWith(false))
  })

  it('should call setIsSidebarOpen with false after click button', async () => {
    const closeIcon = screen.getByTestId('CloseIcon')
    fireEvent.click(closeIcon)

    await waitFor(() => expect(setIsSidebarOpen).toHaveBeenCalledWith(false))
  })
})
