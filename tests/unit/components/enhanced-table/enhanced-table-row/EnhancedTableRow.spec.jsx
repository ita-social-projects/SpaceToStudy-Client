import { vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import EnhancedTableRow from '~/components/enhanced-table/enhanced-table-row/EnhancedTableRow'

const handleSelectClick = vi.fn()
const refetchData = vi.fn()
const calculatedCellValue = vi.fn()
const isSelected = vi.fn().mockReturnValue(false)

const mockItem = {
  _id: '123456789',
  name: 'John Smith',
  email: 'john@email.com',
  lastLogin: '2023-02-28'
}

const columns = [
  { field: 'name' },
  { field: 'email' },
  { field: 'last login', calculatedCellValue }
]

const rowActions = [{ label: 'Delete', func: vi.fn() }]

describe('EnhancedTableRow component', () => {
  beforeEach(() => {
    render(
      <table>
        <tbody>
          <EnhancedTableRow
            columns={columns}
            isSelection
            item={mockItem}
            refetchData={refetchData}
            rowActions={rowActions}
            select={{ isSelected, handleSelectClick }}
          />
        </tbody>
      </table>
    )
  })

  it('should render table row with correct data', () => {
    expect(screen.getByText('John Smith')).toBeInTheDocument()
    expect(calculatedCellValue).toHaveBeenCalled()
  })

  it('should call handleSelectClick when checkbox is clicked', () => {
    const checkbox = screen.getByRole('checkbox')

    fireEvent.click(checkbox)

    expect(handleSelectClick).toHaveBeenCalled()
  })

  it('should render action menu when menu icon is clicked', async () => {
    const menuIcon = screen.getByTestId('menu-icon')

    fireEvent.click(menuIcon)

    const menuItem = await screen.findByText('Delete')

    expect(menuItem).toBeInTheDocument()
  })

  it('should call  onAction function when clicking on the menu item', async () => {
    const menuIcon = screen.getByTestId('menu-icon')

    fireEvent.click(menuIcon)

    const menuItem = await screen.findByText('Delete')

    fireEvent.click(menuItem)

    await waitFor(() =>
      expect(rowActions[0].func).toHaveBeenCalledWith(mockItem._id)
    )
  })

  it('should close menu when "escape" is pressed', async () => {
    const menuIcon = screen.getByTestId('menu-icon')

    fireEvent.click(menuIcon)

    const menuItem = screen.queryByText('Delete')

    await waitFor(() => expect(menuItem).toBeInTheDocument())

    fireEvent.keyDown(menuItem, {
      key: 'Escape',
      code: 'Escape'
    })

    await waitFor(() => expect(screen.queryByText('Delete')).toBeNull())
  })
})
