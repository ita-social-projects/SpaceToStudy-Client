import { fireEvent, render, screen } from '@testing-library/react'
import { renderHook } from '@testing-library/react'

import EnhancedTablePagination from '~/components/enhanced-table/enhanced-table-pagination/EnhancedTablePagination'
import usePagination from '~/hooks/table/use-pagination'

const itemsCount = 100

describe('EnhancedTablePagination test', () => {
  it('Should render first page', () => {
    const { result } = renderHook(() => usePagination({ itemsCount }))
    render(<EnhancedTablePagination pagination={result.current} />)

    const firstPageRows = screen.getByText(`1-5 table.of ${itemsCount}`)

    expect(firstPageRows).toBeInTheDocument()
  })

  it('Should change page from 1 to 2', async () => {
    const { result } = renderHook(() => usePagination({ itemsCount }))
    const { rerender } = render(
      <EnhancedTablePagination pagination={result.current} />
    )
    const inputField = screen.getByTestId('pagination-page-input')

    fireEvent.change(inputField, { target: { value: 2 } })

    rerender(<EnhancedTablePagination pagination={result.current} />)

    expect(inputField.value).toBe('2')

    const button = screen.getByText('table.go')

    fireEvent.click(button)

    rerender(
      <EnhancedTablePagination
        itemsCount={itemsCount}
        pagination={result.current}
      />
    )

    const secondPageRows = screen.getByText(`6-10 table.of ${itemsCount}`)

    expect(secondPageRows).toBeInTheDocument()
  })
})
