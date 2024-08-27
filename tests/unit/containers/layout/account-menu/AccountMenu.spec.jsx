import { screen, fireEvent } from '@testing-library/react'
import AccountMenu from '~/containers/layout/account-menu/AccountMenu'
import { renderWithProviders } from '~tests/test-utils'
import { authRoutes } from '~/router/constants/authRoutes'
import { vi } from 'vitest'

vi.mock('~/hooks/use-redux', () => {
  return {
    useAppSelector: vi.fn(() => ({ userRole: 'tutor' }))
  }
})

describe('AccountMenu component', () => {
  const mockOnClose = vi.fn()
  const mockAnchorEl = document.createElement('div')

  beforeEach(() => {
    renderWithProviders(
      <AccountMenu anchorEl={mockAnchorEl} onClose={mockOnClose} />
    )
  })

  it('should render menu items based on userRole', () => {
    const expectedItems = Object.values(authRoutes.accountMenu['tutor']).map(
      (item) => screen.getByText(`header.${item.route}`)
    )

    expectedItems.forEach((item) => {
      expect(item).toBeInTheDocument()
    })
  })

  it('should render logout button', () => {
    const logoutButton = screen.getByText(
      `header.${authRoutes.accountMenu.logout.route}`
    )
    expect(logoutButton).toBeInTheDocument()
  })

  it('should call onClose when clicking on a menu item', () => {
    const menuItem = screen.getByText(
      `header.${authRoutes.accountMenu['tutor'].myCourses.route}`
    )
    fireEvent.click(menuItem)
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })
})
