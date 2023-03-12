import { fireEvent, screen } from '@testing-library/react'

import { renderWithProviders } from '~tests/test-utils'
import AdminNavBar from '~/containers/layout/admin-portal/admin-nav-bar/AdminNavBar'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useLinkClickHandler: () => vi.fn(),
  }
})

describe('Admin nav bar test', () => {
  beforeEach(() => {
    renderWithProviders(<AdminNavBar />)
  })

  it.skip('should open nav bar', () => {
    const adminNavBar = screen.getByTestId('AdminNavBar')
    const expandButton = screen.getByTestId('ArrowCircleRightIcon')
    fireEvent.click(expandButton)

    expect(getComputedStyle(adminNavBar).width).toBe('250px')
  })

  it.skip('should open sub items', () => {
    const rolesButton = screen.getByTestId('AccountCircleIcon')
    fireEvent.click(rolesButton)

    const admins = screen.getByText('admin.navBar.admins')
    const tutors = screen.getByText('admin.navBar.tutors')
    const students = screen.getByText('admin.navBar.students')

    expect(admins).toBeInTheDocument()
    expect(tutors).toBeInTheDocument()
    expect(students).toBeInTheDocument()
  })

  it.skip('should set clicked item to active', () => {
    const rolesButton = screen.getByTestId('AccountCircleIcon')
    fireEvent.click(rolesButton)

    const admins = screen.getByText('admin.navBar.admins')
    fireEvent.click(admins)

    expect(getComputedStyle(admins).fontWeight).toBe('600')
  })

  it('should close nav bar', () => {
    const adminNavBar = screen.getByTestId('AdminNavBar')
    const openButton = screen.getByTestId('ArrowCircleRightIcon')
    fireEvent.click(openButton)

    const closeButton = screen.getByTestId('ArrowCircleLeftIcon')
    fireEvent.click(closeButton)

    expect(getComputedStyle(adminNavBar).width).toBe('90px')
  })
})
