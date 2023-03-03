import { render, screen, fireEvent } from '@testing-library/react'
import EnhancedTableRow from '~/components/enhanced-table/enhanced-table-row/EnhancedTableRow'
import { vi } from 'vitest'

const mockItem = {
  _id: '123456789',
  name: 'John Smith',
  email: 'john@email.com',
  lastLogin: '2023-02-28T16:26:38.698Z'
}

const refetchData = vi.fn()
const handleSelectClick = vi.fn()
const openMenu = vi.fn()
const handleDelete = vi.fn()
const actionFuncMock = vi.fn()
const calculatedCellValue = vi.fn()

const mockTableContext = {
  isSelection: true,
  columns: [
    { field: 'name' },
    { field: 'email' },
    { field: 'last login', calculatedCellValue },
  ],
  rowActions: [
    { label: 'Delete', handleDelete },
  ],
}

vi.mock('~/hooks/use-menu', () => ({
  __esModule: true,
  default: () => ({
    openMenu,
    renderMenu: vi.fn(),
  }),
}))

vi.mock('~/hooks/table/use-select', () => ({
  __esModule: true,
  default: () => ({ handleSelectClick }),
}))

vi.mock('~/context/table-context', () => ({
  __esModule: true,
  useTableContext: vi.fn(() => mockTableContext),
}))

describe('EnhancedTableRow component', () => {

  it('renders table row with columns and checkbox', () => {
    const { container } = render(<EnhancedTableRow isItemSelected={ false } item={ mockItem } refetchData />)
    expect(container.querySelector('tr')).toBeInTheDocument()
    expect(screen.getByText('John Smith')).toBeInTheDocument()
    expect(screen.getByText('john@email.com')).toBeInTheDocument()
    expect(screen.queryByRole('checkbox')).toBeInTheDocument()
    expect(screen.queryByTestId('menu-icon')).toBeInTheDocument()
  })

  it('calls handleSelectClick when checkbox is clicked', () => {
    render(<EnhancedTableRow isItemSelected={ false } item={ mockItem } refetchData />)
    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    expect(handleSelectClick).toHaveBeenCalled()
  })

  it('renders action menu when menu icon is clicked', async() => {
    render(<EnhancedTableRow isItemSelected={ false } item={ mockItem } refetchData />)
    const menuIcon = screen.getByTestId('menu-icon')
    fireEvent.click(menuIcon)
    const deleteIcon = screen.getByText('Delete')
    expect(openMenu).toHaveBeenCalled()
    expect(deleteIcon).toBeInTheDocument()
  })

  it('calls actionFunc function when clicking on menu item', async() => {
    render(<EnhancedTableRow isItemSelected={ false } item={ mockItem } refetchData />)
    const menuIcon = screen.getByTestId('menu-icon')
    fireEvent.click(menuIcon)
    fireEvent.click(screen.getByText('Delete'))
    expect(actionFuncMock).toHaveBeenCalledWith(mockItem._id)
    expect(refetchData).toHaveBeenCalled()
    expect(actionFuncMock).toHaveBeenCalledWith(handleDelete)
  })

  it('calculates cell value', () => {
    render(<EnhancedTableRow isItemSelected={ false } item={ mockItem } refetchData />)
    expect(calculatedCellValue).toHaveBeenCalledWith(mockItem)
  })

})
