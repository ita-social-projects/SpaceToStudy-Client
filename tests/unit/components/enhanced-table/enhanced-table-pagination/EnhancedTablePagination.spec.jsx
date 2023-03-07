import EnhancedTablePagination from '~/components/enhanced-table/enhanced-table-pagination/EnhancedTablePagination'
import { fireEvent, render, screen } from '@testing-library/react'
import { useTableContext } from '~/context/table-context'
import { vi } from 'vitest'

const handlePageSubmitMock = vi.fn()

vi.mock('~/context/table-context', () => ({
  useTableContext: vi.fn()
}))

vi.mock('~/hooks/table/use-pagination', () => ({
  default: () => ({ handlePageSubmit: handlePageSubmitMock })
}))

const mockedProps = 100

const page = 1
const pageInput = 10
const rowsPerPage = 5

describe('EnhancedTablePagination test', () => {
  beforeEach(() => {
    useTableContext.mockReturnValue({
      page,
      pageInput,
      rowsPerPage
    })
    render(<EnhancedTablePagination handlePageSubmit={ handlePageSubmitMock } itemsCount={ mockedProps } />)
  })

  it('Renders correctly number of rows', () => {
    const labelRowsPerPage = screen.getByText('table.numberOfRows')
    expect(labelRowsPerPage).toBeInTheDocument()
  })
  it('render Go to Page  element in component', () => {
    const goToPage = screen.getByText('table.goToPage')
    expect(goToPage).toBeInTheDocument()
  })
  it('should render correctly button in component', () => {
    const buttonName = screen.getByText('table.go')
    expect(buttonName).toBeInTheDocument()
  })
  it('should correctly display number of rows', () => {
    const displayedRowsLabel = screen.getByText('6-10 table.of 100')
    expect(displayedRowsLabel).toBeInTheDocument()
  })

  it('should call handlePageSubmit when button was clicked', () => {
    const button = screen.getByText('table.go')
    fireEvent.click(button)
    expect(handlePageSubmitMock).toHaveBeenCalled()
  })
})
