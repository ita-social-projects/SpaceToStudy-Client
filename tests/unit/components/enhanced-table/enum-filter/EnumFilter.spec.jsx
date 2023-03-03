import { vi } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/react'

import EnumFilter from '~/components/enhanced-table/enum-filter/EnumFilter'

const props = {
  column: {
    label: 'adminTable.status',
    field: '', 
    dataType: 'enums',
    filterEnum: [
      {
        label: 'adminTable.active',
        value: 'active'
      },
      {
        label: 'adminTable.blocked',
        value: 'blocked'
      }
    ]
  },
  filter: '',
  setFilter: vi.fn(),
  clearFilter: vi.fn()
}

describe('EnumFilter test', () => {
  beforeEach(() => {
    render(
      <EnumFilter { ...props } />
    )
  })

  it('should open menu after clicking on filter icon', () => {
    const filterIcon = screen.getByTestId('filter-icon')
    fireEvent.click(filterIcon)
    const filterMenu = screen.getByRole('menu') 
    expect(filterMenu).toBeInTheDocument()
  })

  it('should clear filtered values in the table', () => {
    const clearIcon = screen.getByTestId('clear-icon')
    fireEvent.click(clearIcon)
    expect(props.clearFilter).toHaveBeenCalled()
  })

  it('should NOT display clearIcon before adding filters', () => {
    const clearIcon = screen.getByTestId('clear-icon')
    expect(clearIcon).toHaveClass('hidden')
  })

})
