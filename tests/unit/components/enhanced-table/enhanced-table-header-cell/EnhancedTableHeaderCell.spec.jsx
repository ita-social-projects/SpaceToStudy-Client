import { vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import EnhancedTableHeaderCell from '~/components/enhanced-table/enhanced-table-header-cell/EnhancedTableHeaderCell'
import { useTableContext } from '~/context/table-context'

const columnMock = {
  dataType: 'string',
  field: 'email',
  label: 'adminTable.email'
}
const sort = { order: 'asc', orderBy: 'email' }
const setSort = vi.fn()
const onRequestSort = vi.fn()
const tableSortLableId = 'tableSortLable'

vi.mock('~/context/table-context', () => ({
  useTableContext: vi.fn()
}))

vi.mock('~/hooks/table/use-sort', () => ({
  __esModule: true,
  default: () => ({ onRequestSort: onRequestSort })
}))

describe('EnhancedTableHeadercell', () => {
  beforeEach(() => {
    useTableContext.mockReturnValue({
      sort,
      setSort
    })

    render(
      <table>
        <tbody>
          <tr>
            <EnhancedTableHeaderCell column={columnMock} />
          </tr>
        </tbody>
      </table>
    )
  })

  it('render column header cell in the table', () => {
    const tableSortLable = screen.getByTestId(tableSortLableId)

    expect(tableSortLable).toBeInTheDocument()
  })

  it('click to change direction in the column', async () => {
    const tableSortLable = screen.getByTestId(tableSortLableId)
    fireEvent.click(tableSortLable)

    expect(onRequestSort).toHaveBeenCalled()
  })
})
