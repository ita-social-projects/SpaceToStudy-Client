import EnhancedTablePagination from '~/components/enhanced-table/enhanced-table-pagination/EnhancedTablePagination'
import { fireEvent, render, screen } from '@testing-library/react'
import { TableProvider } from '~/context/table-context'

const itemsCountMock = 100

describe('EnhancedTablePagination test', () => {
  beforeEach(() => {
    render(
      <TableProvider>
        <EnhancedTablePagination itemsCount={ itemsCountMock } />
      </TableProvider>
    )
  })

  it('Should render first page', () => {
    const firstPageRows = screen.getByText(`1-5 table.of ${itemsCountMock}`)

    expect(firstPageRows).toBeInTheDocument()
  })

  it('Should change page from 1 to 2', () => {
    const inputField = screen.getByTestId('testid-page-input')

    fireEvent.change(inputField, { target: { value: 2 } })

    expect(inputField.value).toBe('2')

    const button = screen.getByText('table.go')

    fireEvent.click(button)

    const secondPageRows = screen.getByText(`6-10 table.of ${itemsCountMock}`)

    expect(secondPageRows).toBeInTheDocument()
  })
})
