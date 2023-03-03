import { vi } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/react'

import EnumFilter from '~/components/enhanced-table/enum-filter/EnumFilter'

const mockedProps = {
  column: {
    filterEnum: [
      {
        label: 'adminTable.active',
        value: 'active'
      }
    ]
  },
  filter: '',
  setFilter: vi.fn(),
  clearFilter: vi.fn()
}

describe('EnumFilter test', () => {

  it('should open menu after clicking on filter icon', () => {
    const { rerender } = render(<EnumFilter { ...mockedProps } />) 
    rerender(<EnumFilter { ...mockedProps } />)
    
    const filterIcon = screen.getByTestId('filter-icon')
    fireEvent.click(filterIcon)

    const filterMenu = screen.getByRole('menu') 
    expect(filterMenu).toBeInTheDocument()
  })

  it('should NOT display clearIcon before setting filter', () => {
    const { rerender } = render(<EnumFilter { ...mockedProps } />) 
    rerender(<EnumFilter { ...mockedProps } />)

    const clearIcon = screen.getByTestId('clear-icon-in-filter')
    expect(clearIcon).toHaveClass('hidden')
  })

  it('should display clearIcon after setting filter', () => {
    const { rerender } = render(<EnumFilter { ...mockedProps } />) 
    rerender(<EnumFilter { ...mockedProps } />)
    
    const filterIcon = screen.getByTestId('filter-icon')
    fireEvent.click(filterIcon)

    const filterCheckbox = screen.getByLabelText('filter-checkbox')
    fireEvent.click(filterCheckbox)

    mockedProps.filter = filterCheckbox.value

    rerender(<EnumFilter { ...mockedProps } />)

    const clearIcon = screen.getByTestId('clear-icon-in-filter')
    expect(clearIcon).toHaveClass('visible')
  })

  it('should set filter after checking filterCheckbox', () => {
    const { rerender } = render(<EnumFilter { ...mockedProps } />) 
    rerender(<EnumFilter { ...mockedProps } />)
    
    const filterIcon = screen.getByTestId('filter-icon')
    fireEvent.click(filterIcon)

    const filterCheckbox = screen.getByLabelText('filter-checkbox')
    fireEvent.click(filterCheckbox)

    expect(mockedProps.setFilter).toHaveBeenCalled()
  })

  it('should clear filter after clicking clearIcon', () => {
    const { rerender } = render(<EnumFilter { ...mockedProps } />) 
    rerender(<EnumFilter { ...mockedProps } />)
    
    const clearIcon = screen.getByTestId('clear-icon-in-filter')
    fireEvent.click(clearIcon)

    expect(mockedProps.clearFilter).toHaveBeenCalled()
  })
})
