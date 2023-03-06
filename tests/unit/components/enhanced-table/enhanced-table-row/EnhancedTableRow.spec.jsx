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
  { field: 'last login', calculatedCellValue: calculatedCellValueMock },
]

const rowActions = [
  { label: 'Delete', func: vi.fn() },
]

const isSelection = true

vi.mock('~/hooks/table/use-select', () => ({
  __esModule: true,
  default: () => ({ handleSelectClick: handleSelectClickMock }),
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
    render(<EnhancedTableRow isItemSelected={ false } item={ mockItem } refetchData={ refetchDataMock } />)
  })

  it('renders table row with all columns', async() => {
    expect(screen.getByText('John Smith')).toBeInTheDocument()
    expect(screen.getByText('john@email.com')).toBeInTheDocument()
    expect(calculatedCellValueMock).toHaveBeenCalled()
  })

  it('renders table row with checkbox and menu icon', () => {
    expect(screen.queryByRole('checkbox')).toBeInTheDocument()
    expect(screen.queryByTestId('menu-icon')).toBeInTheDocument()
  })

  it('calls handleSelectClick when checkbox is clicked', () => {
    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    expect(handleSelectClickMock).toHaveBeenCalled()
  })

  it('renders action menu when menu icon is clicked', async() => {
    const menuIcon = screen.getByTestId('menu-icon')
    fireEvent.click(menuIcon)
    expect(await screen.findByText('Delete')).toBeInTheDocument()
  })

  it('calls onAction function when clicking on the menu item', async() => {
    const menuIcon = screen.getByTestId('menu-icon')
    fireEvent.click(menuIcon)
    await waitFor(() => {
      fireEvent.click(screen.getByText('Delete'))
      expect(rowActions[0].func).toHaveBeenCalledWith(mockItem._id)
    })
  })
  it('calls closeMenu function when clicking outside of the menu', async() => {
    const menuIcon = screen.getByTestId('menu-icon')
    fireEvent.click(menuIcon)
    await waitFor(() => expect(screen.getByText('Delete')).toBeInTheDocument())
    fireEvent.click(screen.getByRole('presentation').firstChild)
    expect(menuIcon).toBeInTheDocument()
  })

})
