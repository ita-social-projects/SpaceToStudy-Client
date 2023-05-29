import { vi } from 'vitest'
import { screen, render, fireEvent } from '@testing-library/react'
import FilterCell from '~/components/enhanced-table/filter-row/filter-cell/FilterCell'

const mockedPropsForSearch = {
  column: { label: 'studentTable.email', field: 'email', dataType: 'string' },
  filter: ' ',
  setFilter: vi.fn(),
  clearFilter: vi.fn()
}

const mockedPropsForLastLogin = {
  column: {
    label: 'studentTable.lastLogin',
    field: 'lastLogin',
    dataType: 'date',
    calculatedCellValue: vi.fn()
  },
  filter: { from: '', to: '' },
  setFilter: vi.fn(),
  clearFilter: vi.fn()
}

const mockedPropsForFirstLogin = {
  column: {
    label: 'studentTable.firstLogin',
    field: 'isFirstLogin',
    dataType: 'enums',
    filterEnum: Array(2)
  },
  filter: ' ',
  setFilter: vi.fn(),
  clearFilter: vi.fn()
}

const renderCell = (props) =>
  render(
    <table>
      <tbody>
        <tr>
          <FilterCell {...props} />
        </tr>
      </tbody>
    </table>
  )

describe('FilterRow tests', () => {
  it('Should render Search Name block', () => {
    renderCell(mockedPropsForSearch)
    const searchIcon = screen.getByTestId('SearchIcon')

    expect(searchIcon).toBeInTheDocument()

    const deleteIcon = screen.getByTestId('delete-icon')

    expect(deleteIcon).toBeInTheDocument()
  })

  it('Should render Last login block', () => {
    renderCell(mockedPropsForLastLogin)
    const searchIcon = screen.getByTestId('CalendarMonthIcon')

    expect(searchIcon).toBeInTheDocument()

    fireEvent.click(searchIcon)

    const clearIcon = screen.getByTestId('clear-icon')

    expect(clearIcon).toBeInTheDocument()
  })

  it('Should render First login block', () => {
    renderCell(mockedPropsForFirstLogin)
    const searchIcon = screen.getByTestId('FilterAltIcon')

    expect(searchIcon).toBeInTheDocument()

    const clearIcon = screen.getByTestId('ClearIcon')

    expect(clearIcon).toBeInTheDocument()
  })
})
