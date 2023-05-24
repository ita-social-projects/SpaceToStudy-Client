import { vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import EnhancedTableRow from '~/components/enhanced-table/enhanced-table-row/EnhancedTableRow'
import { useTableContext } from '~/context/table-context'

const handleSelectClickMock = vi.fn()
const refetchDataMock = vi.fn()
const calculatedCellValueMock = vi.fn()

const mockItem = {
  _id: '123456789',
  name: 'John Smith',
  email: 'john@email.com',
  lastLogin: '2023-02-28'
}

const columns = [
  { field: 'name' },
  { field: 'email' },
  { field: 'last login', calculatedCellValue: calculatedCellValueMock }
]

const rowActions = [{ label: 'Delete', func: vi.fn() }]

const isSelection = true

vi.mock('~/hooks/table/use-select', () => ({
  __esModule: true,
  default: () => ({ handleSelectClick: handleSelectClickMock })
}))

vi.mock('~/context/table-context', () => ({
  useTableContext: vi.fn()
}))

describe('EnhancedTableRow component', () => {
  beforeEach(() => {
    useTableContext.mockReturnValue({
      isSelection,
      columns,
      rowActions
    })
    render(
      <table>
        <tbody>
          <EnhancedTableRow
            isItemSelected={false}
            item={mockItem}
            refetchData={refetchDataMock}
          />
        </tbody>
      </table>
    )
  })

  it('should render table row with correct data', () => {
    expect(screen.getByText('John Smith')).toBeInTheDocument()
    expect(calculatedCellValueMock).toHaveBeenCalled()
  })

  it('should call handleSelectClick when checkbox is clicked', () => {
    const checkbox = screen.getByRole('checkbox')

    fireEvent.click(checkbox)

    expect(handleSelectClickMock).toHaveBeenCalled()
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
