import { fireEvent, screen } from '@testing-library/react'

import { renderWithProviders } from '~tests/test-utils'
import AdminNavBar from '~/containers/layout/admin-portal/admin-nav-bar/AdminNavBar'

describe('Admin nav bar test', () => {
  beforeEach(() => {
    renderWithProviders(<AdminNavBar />)
  })

  it('should open nav bar', () => {
    const adminNavBar = screen.getByTestId('AdminNavBar')
    const expandButton = screen.getByTestId('ArrowCircleRightIcon')
    fireEvent.click(expandButton)

    expect(getComputedStyle(adminNavBar).width).toBe('250px')
  })

  it('should open sub items', () => {
    const rolesButton = screen.getByTestId('AccountCircleIcon')
    fireEvent.click(rolesButton)

    const admins = screen.getByText('admin.navBar.admins')
    const tutors = screen.getByText('admin.navBar.tutors')
    const students = screen.getByText('admin.navBar.students')

    expect(admins).toBeInTheDocument()
    expect(tutors).toBeInTheDocument()
    expect(students).toBeInTheDocument()
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
