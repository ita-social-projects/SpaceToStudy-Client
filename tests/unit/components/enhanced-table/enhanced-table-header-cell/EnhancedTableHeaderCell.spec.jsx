import { vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import EnhancedTableHeaderCell from '~/components/enhanced-table/enhanced-table-header-cell/EnhancedTableHeaderCell'
import { useTableContext } from '~/context/table-context'

const columnMock = { dataType: 'string', field: 'email', label: 'adminTable.email' }
const sort = { order: 'asc', orderBy: 'email' }
const setSort = vi.fn()
const onRequestSort = vi.fn()

vi.mock('~/context/table-context', () => ({
  useTableContext: vi.fn()
}))

vi.mock('~/hooks/table/use-sort', () => ({
    __esModule: true,
    default: () => ({ onRequestSort: onRequestSort }),
  }))

describe('EnhancedTableHeadercell', () => {
  beforeEach(() => {
    useTableContext.mockReturnValue({
      sort,
      setSort
    })

    render(<EnhancedTableHeaderCell column={columnMock} />)
  })

  it('render column header cell in the table', () => {
    const tableSortLable = screen.getByTestId('tableSortLable')

    expect(tableSortLable).toBeInTheDocument()
  })

  it('click to change direction', async () => {
    const tableSortLable = screen.getByTestId('tableSortLable')

    fireEvent.click(tableSortLable)

    await waitFor(() => expect(onRequestSort).toHaveBeenCalled())
  })
})
