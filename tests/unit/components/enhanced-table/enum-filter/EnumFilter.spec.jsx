import { vi } from 'vitest'
import { render, fireEvent, screen, cleanup } from '@testing-library/react'

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
  setFilter: vi.fn(),
  clearFilter: vi.fn()
}

const mockedFilterBeforeClick = ''

describe('EnumFilter test', () => {
  beforeEach(() => {
    render(<EnumFilter {...mockedProps} filter={mockedFilterBeforeClick} />)
  })

  it('should open menu after clicking on filter icon', () => {
    const filterIcon = screen.getByTestId('filter-icon')
    fireEvent.click(filterIcon)

    const filterMenu = screen.getByRole('menu')
    expect(filterMenu).toBeInTheDocument()
  })

  it('should NOT display clearIcon before setting filter', () => {
    const clearIcon = screen.getByTestId('clear-icon-in-filter')
    expect(clearIcon).toHaveClass('hidden')
  })

  it('should display clearIcon after setting filter', () => {
    const filterIcon = screen.getByTestId('filter-icon')
    fireEvent.click(filterIcon)

    const filterCheckbox = screen.getByLabelText('filter-checkbox')
    fireEvent.click(filterCheckbox)

    const mockedFilterAfterClick = 'name'

    cleanup()

    render(<EnumFilter {...mockedProps} filter={mockedFilterAfterClick} />)

    const clearIcon = screen.getByTestId('clear-icon-in-filter')
    expect(clearIcon).toHaveClass('visible')
  })

  it('should set filter after checking filterCheckbox', () => {
    const filterIcon = screen.getByTestId('filter-icon')
    fireEvent.click(filterIcon)

    const filterCheckbox = screen.getByLabelText('filter-checkbox')
    fireEvent.click(filterCheckbox)

    expect(mockedProps.setFilter).toHaveBeenCalled()
  })

  it('should clear filter after clicking clearIcon', () => {
    const clearIcon = screen.getByTestId('clear-icon-in-filter')
    fireEvent.click(clearIcon)

    expect(mockedProps.clearFilter).toHaveBeenCalled()
  })
})
