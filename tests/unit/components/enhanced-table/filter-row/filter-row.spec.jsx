import FilterRow from '~/components/enhanced-table/filter-row/FilterRow'
import { useTableContext } from '~/context/table-context'
import { vi } from 'vitest'
import { fireEvent, screen, render, renderWithProviders } from '@testing-library/react'


vi.mock('~/context/table-context', () => ({
  useTableContext: vi.fn()
}))

const isSelection = true
const columns = [
  { label: 'studentTable.name', field: 'name', dataType: 'string' },
  { label: 'studentTable.email', field: 'email', dataType: 'string' },
  { label: 'studentTable.lastLogin', field: 'lastLogin', dataType: 'date', calculatedCellValue: vi.fn() },
  { label: 'studentTable.firstLogin', field: 'isFirstLogin', dataType: 'enums', filterEnum: Array(2) }
]
const filters = { name: '', email: '', lastLogin: '', isFirstLogin: Array(0) }


describe('FilterRow tests', () => {
  beforeEach(() => {
    useTableContext.mockReturnValue({
      isSelection,
      columns,
      filters
    })
    render(<FilterRow  />)
  })
  
  it('Should render all filter icons', () => {
    const searchIcon = screen.getAllByTestId('SearchIcon')
    
    expect(searchIcon.length).toBe(2)

    const calendarIcon = screen.getByTestId('CalendarMonthIcon')
  
    expect(calendarIcon).toBeInTheDocument()

    const filterIcon = screen.getByTestId('FilterAltIcon')

    expect(filterIcon).toBeInTheDocument()
  })

  it('Should render calender', () => {
    const calendarIcon = screen.getByTestId('CalendarMonthIcon')
    
    fireEvent.click(calendarIcon)

    const calendar = screen.getAllByRole('dialog')

    expect(calendar.length).toBe(2)
  })

  it('Should render filters', () => {
    const filterIcon = screen.getByTestId('FilterAltIcon')
    
    fireEvent.click(filterIcon)

    const menu = screen.getByRole('menu')

    expect(menu).toBeInTheDocument()
  })
  
})
