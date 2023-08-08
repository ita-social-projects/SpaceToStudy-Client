import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import EnhancedTableHead from '~/components/enhanced-table/enhanced-table-head/EnhancedTableHead'

const columnsMock = [
  {
    label: 'Name',
    field: 'name',
    dataType: 'string'
  },
  {
    label: 'Email',
    field: 'email',
    dataType: 'string'
  }
]
const sort = { order: 'asc', orderBy: 'email' }
const rowActions = [{ label: 'Delete', func: vi.fn() }]
const selected = []
const count = 10
const createSelectAllHandler = vi.fn()
const onRequestSort = vi.fn()

describe('EnhancedTableHead', () => {
  beforeEach(() => {
    render(
      <table>
        <EnhancedTableHead
          columns={columnsMock}
          data={{ count }}
          isSelection
          rowActions={rowActions}
          rowsPerPage={5}
          select={{ selected, createSelectAllHandler }}
          sort={{ sort, onRequestSort }}
        />
      </table>
    )
  })

  it('renders all columns in the table', () => {
    const nameColumn = screen.getByText(columnsMock[0].label)
    const emailColumn = screen.getByText(columnsMock[1].label)

    expect(nameColumn).toBeInTheDocument()
    expect(emailColumn).toBeInTheDocument()
  })
  it('Should show table actions when isSelection is true', () => {
    const tableActions = screen.getByText('table.actions')

    expect(tableActions).toBeInTheDocument()
  })
  it('Should call function onSelectAllClick when checkbox value is changed', () => {
    const actionColumn = screen.getByRole('checkbox')
    fireEvent.click(actionColumn)

    expect(createSelectAllHandler).toHaveBeenCalled()
  })
})
