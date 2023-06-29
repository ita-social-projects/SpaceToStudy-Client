import { screen, fireEvent, waitFor } from '@testing-library/react'
import Sidebar from '~/containers/layout/sidebar/Sidebar'
import { renderWithProviders } from '~tests/test-utils'
import { vi } from 'vitest'

describe('Sidebar test', () => {
  const setIsSidebarOpen = vi.fn()
  const navigationItems = [{ route: 'label-test', path: '/#route-test' }]
  const accountItems = [{ route: 'test', path: '/#test' }]

  beforeEach(() => {
    renderWithProviders(
      <Sidebar
        accountItems={accountItems}
        navigationItems={navigationItems}
        onClose={setIsSidebarOpen}
      />
    )
  })

  it('should render navigation item with label text', () => {
    const text = screen.getByText('header.label-test')

    expect(text).toBeInTheDocument()
  })

  it('should render link and call setIsSidebarOpen with false after click link', async () => {
    const [linkElement] = screen.getAllByRole('link')
    expect(linkElement).toHaveAttribute('href', '/#route-test')

    fireEvent.click(linkElement)
    await waitFor(() => expect(setIsSidebarOpen).toHaveBeenCalled())
  })
})
