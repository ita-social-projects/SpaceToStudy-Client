import { vi } from 'vitest'
import { fireEvent, screen, render } from '@testing-library/react'
import { useTableContext } from '~/context/table-context'
import FilterRow from '~/components/enhanced-table/filter-row/FilterRow'


vi.mock('~/context/table-context', () => ({
  useTableContext: vi.fn()
}))

vi.mock('~/hooks/table/use-filter', () => {
  return {
    default: () => ({ setFilterByKey: () => {}, clearFilterByKey: () => {} })
  }
})


const isSelection = true
const columns = [
  { label: 'baseUserTable.name', field: 'name', dataType: 'string' },
  { label: 'baseUserTable.email', field: 'email', dataType: 'string' },
  { label: 'baseUserTable.lastLogin', field: 'lastLogin', dataType: 'date', calculatedCellValue: vi.fn() },
  { label: 'baseUserTable.firstLogin', field: 'isFirstLogin', dataType: 'enums', filterEnum: Array(2) }
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

  it('Should clear filters', () => {
    const filterIcon = screen.getByTestId('FilterAltIcon')

    fireEvent.click(filterIcon)

    const menu = screen.getByRole('menu')
    expect(menu).toBeInTheDocument()
   
    const clearIcon = screen.getAllByTestId('ClearIcon')
    fireEvent.click(clearIcon[3])
  })
  
})
