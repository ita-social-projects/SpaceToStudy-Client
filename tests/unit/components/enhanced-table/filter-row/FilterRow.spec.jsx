import { vi } from 'vitest'
import { fireEvent, screen, render } from '@testing-library/react'

import FilterRow from '~/components/enhanced-table/filter-row/FilterRow'

const columns = [
  { label: 'userTable.name', field: 'name', dataType: 'string' },
  { label: 'userTable.email', field: 'email', dataType: 'string' },
  {
    label: 'userTable.lastLogin',
    field: 'lastLogin',
    dataType: 'date',
    calculatedCellValue: vi.fn()
  },
  {
    label: 'userTable.firstLogin',
    field: 'isFirstLogin',
    dataType: 'enums',
    filterEnum: Array(2)
  }
]
const filters = { name: '', email: '', lastLogin: '', isFirstLogin: Array(0) }
const setFilterByKey = vi.fn()
const clearFilterByKey = vi.fn()

describe('FilterRow tests', () => {
  beforeEach(() => {
    render(
      <table>
        <tbody>
          <FilterRow
            columns={columns}
            filter={{ filters, setFilterByKey, clearFilterByKey }}
            isSelection
          />
        </tbody>
      </table>
    )
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
