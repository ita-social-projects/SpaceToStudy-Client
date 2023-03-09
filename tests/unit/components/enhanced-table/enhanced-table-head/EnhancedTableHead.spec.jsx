import { vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { TableProvider } from '~/context/table-context'
import EnhancedTableHead from '~/components/enhanced-table/enhanced-table-head/EnhancedTableHead'

const columnsMock = [
  {
    label: 'Name',
    field: 'name',
    dataType: 'string',
  },
  {
    label: 'Email',
    field: 'email',
    dataType: 'string'
  },
]
const initialSortMock = { order: 'asc', orderBy: 'email' }
const itemsCountMock = 10
const onSelectAllClickMock = vi.fn()

describe('EnhancedTableHead', () => {
  beforeEach(()=>{
    render(
      <TableProvider columns={ columnsMock } initialSort={ initialSortMock } isSelection>
        <table>
          <EnhancedTableHead
            itemsCount={ itemsCountMock }
            onSelectAllClick={ onSelectAllClickMock }
          />
        </table>
      </TableProvider>
    )
  })

  it('renders all columns in the table', () => {
    const nameColumn = screen.getByText(columnsMock[0].label)
    const emailColumn = screen.getByText(columnsMock[1].label)
    
    expect(nameColumn).toBeInTheDocument()
    expect(emailColumn).toBeInTheDocument()
  })
  it('Should show table actions when isSelection is true', () => {
    const actionColumn = screen.getByText('table.actions')

    expect(actionColumn).toBeInTheDocument()
  })
  it('Should call function onSelectAllClick when checkbox value is changed', () => {
    const actionColumn = screen.getByRole('checkbox')
    fireEvent.click(actionColumn)

    expect(onSelectAllClickMock).toHaveBeenCalled()
  })
})
