import { vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

import EnhancedTableHeaderCell from '~/components/enhanced-table/enhanced-table-header-cell/EnhancedTableHeaderCell'

const columnMock = {
  dataType: 'string',
  field: 'email',
  label: 'adminTable.email'
}
const sort = { order: 'asc', orderBy: 'email' }
const onRequestSort = vi.fn()
const tableSortLabelId = 'tableSortLabel'

describe('EnhancedTableHeaderCell', () => {
  beforeEach(() => {
    render(
      <table>
        <tbody>
          <tr>
            <EnhancedTableHeaderCell
              column={columnMock}
              sort={{ sort, onRequestSort }}
            />
          </tr>
        </tbody>
      </table>
    )
  })

  it('render column header cell in the table', () => {
    const tableSortLabel = screen.getByTestId(tableSortLabelId)

    expect(tableSortLabel).toBeInTheDocument()
  })

  it('click to change direction in the column', async () => {
    const tableSortLabel = screen.getByTestId(tableSortLabelId)
    fireEvent.click(tableSortLabel)

    expect(onRequestSort).toHaveBeenCalled()
  })
})
