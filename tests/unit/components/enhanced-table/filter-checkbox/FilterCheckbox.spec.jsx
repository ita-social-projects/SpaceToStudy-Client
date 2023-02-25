import { render, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'

import FilterCheckbox from '~/components/enhanced-table/filter-checkbox/FilterCheckbox'

let mockedFilter = []
let mockedCheckbox
const mockedSetFilter = vi.fn()

const mockedFilterCheckbox = {
  label: 'adminTable.active',
  value: 'active'
}

describe('FilterCheckbox test', () => {
  it('should add checkboxValue to filters when is checked', () => {
    const { getByLabelText, rerender } = render(<FilterCheckbox filter={ mockedFilter } filterCheckbox={ mockedFilterCheckbox } setFilter={ mockedSetFilter } />)
    
    mockedCheckbox = getByLabelText('filter-checkbox')
    expect(mockedCheckbox.checked).toBe(false)

    fireEvent.click(mockedCheckbox)
    mockedFilter.push(mockedFilterCheckbox.value)
    rerender(<FilterCheckbox filter={ mockedFilter } filterCheckbox={ mockedFilterCheckbox } setFilter={ mockedSetFilter } />)
    
    mockedCheckbox = getByLabelText('filter-checkbox')
    expect(mockedCheckbox.checked).toBe(true)
    expect(mockedSetFilter).toBeCalled()
  })
  it('should remove checkboxValue from filters when is unchecked', () => {
    mockedFilter = [mockedFilterCheckbox.value]
    const { getByLabelText, rerender } = render(<FilterCheckbox filter={ mockedFilter } filterCheckbox={ mockedFilterCheckbox } setFilter={ mockedSetFilter } />)
    mockedCheckbox = getByLabelText('filter-checkbox')
    expect(mockedCheckbox.checked).toBe(true)

    fireEvent.click(mockedCheckbox)
    mockedFilter = mockedFilter.filter(value => value !== mockedFilterCheckbox.value)
    rerender(<FilterCheckbox filter={ mockedFilter } filterCheckbox={ mockedFilterCheckbox } setFilter={ mockedSetFilter } />)
    
    mockedCheckbox = getByLabelText('filter-checkbox')
    expect(mockedCheckbox.checked).toBe(false)
    expect(mockedSetFilter).toBeCalled()
  })
})
