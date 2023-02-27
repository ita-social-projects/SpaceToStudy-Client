import { render, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'

import FilterCheckbox from '~/components/enhanced-table/filter-checkbox/FilterCheckbox'

const mockedSetFilter = vi.fn()

const mockedFilterCheckbox = {
  label: 'adminTable.active',
  value: 'active'
}

describe('FilterCheckbox test', () => {
  it('should add checkboxValue to filters when is checked', () => {
    const mockedFilterBeforeClick = []

    const { getByLabelText, rerender } = render(<FilterCheckbox filter={ mockedFilterBeforeClick } filterCheckbox={ mockedFilterCheckbox } setFilter={ mockedSetFilter } />)
    
    const mockedCheckboxBeforeClick = getByLabelText('filter-checkbox')
    expect(mockedCheckboxBeforeClick.checked).toBe(false)

    fireEvent.click(mockedCheckboxBeforeClick)
    const mockedFilterAfterClick = [mockedFilterCheckbox.value]
    rerender(<FilterCheckbox filter={ mockedFilterAfterClick } filterCheckbox={ mockedFilterCheckbox } setFilter={ mockedSetFilter } />)
    
    const mockedCheckboxAfterClick = getByLabelText('filter-checkbox')
    expect(mockedCheckboxAfterClick.checked).toBe(true)
    expect(mockedSetFilter).toBeCalled()
  })
  it('should remove checkboxValue from filters when is unchecked', () => {
    const mockedFilterBeforeClick = [mockedFilterCheckbox.value]
    const { getByLabelText, rerender } = render(<FilterCheckbox filter={ mockedFilterBeforeClick } filterCheckbox={ mockedFilterCheckbox } setFilter={ mockedSetFilter } />)
    const mockedCheckboxBeforeClick = getByLabelText('filter-checkbox')
    expect(mockedCheckboxBeforeClick.checked).toBe(true)

    fireEvent.click(mockedCheckboxBeforeClick)
    const mockedFilterAfterClick = []
    rerender(<FilterCheckbox filter={ mockedFilterAfterClick } filterCheckbox={ mockedFilterAfterClick } setFilter={ mockedSetFilter } />)
    
    const mockedCheckboxAfterClick = getByLabelText('filter-checkbox')
    expect(mockedCheckboxAfterClick.checked).toBe(false)
    expect(mockedSetFilter).toBeCalled()
  })
})
