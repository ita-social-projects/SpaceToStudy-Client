import { vi } from 'vitest'
import { fireEvent, screen, render } from '@testing-library/react'
import DateFilter from '~/components/enhanced-table/date-filter/DateFilter'

describe('DateFilter Component', () => {
  const mockSetFilter = vi.fn()
  const mockClearFilter = vi.fn()
  const filter = { from: new Date(), to: new Date() }

  beforeEach(() => {
    mockSetFilter.mockClear()
    mockClearFilter.mockClear()
  })

  it('renders calendar icon button', () => {
    render(
      <DateFilter
        clearFilter={mockClearFilter}
        filter={filter}
        setFilter={mockSetFilter}
      />
    )
    expect(screen.getByTestId('calendar-icon')).toBeInTheDocument()
  })

  it('calls clearFilter when clear icon button is clicked', () => {
    render(
      <DateFilter
        clearFilter={mockClearFilter}
        filter={filter}
        setFilter={mockSetFilter}
      />
    )
    fireEvent.click(screen.getByTestId('clear-icon'))
    expect(mockClearFilter).toHaveBeenCalled()
  })

  it('shows clear icon button when filter is not empty', () => {
    render(
      <DateFilter
        clearFilter={mockClearFilter}
        filter={filter}
        setFilter={mockSetFilter}
      />
    )
    expect(screen.getByTestId('clear-icon')).toBeVisible()
  })
})
