import { vi } from 'vitest'
import { fireEvent, screen, render } from '@testing-library/react'

import DateFilter from '~/components/enhanced-table/date-filter/DateFilter'

const props = {
  filter: { from: '', to: '' },
  setFilter: vi.fn(),
  clearFilter: vi.fn()
}

const dateMock = new Date('2023-01-01')

describe('DateFilter test', () => {
  beforeEach(() => {
    render(<DateFilter {...props} />)
  })

  it('Should open, and change value in calendar', () => {
    const calendarIcon = screen.getByTestId('calendar-icon')

    fireEvent.click(calendarIcon)

    const dateFilterBtn = screen.getAllByLabelText('Choose date')

    fireEvent.click(dateFilterBtn[0])

    const dateFromInput = screen.getByLabelText('date-filter-from')

    fireEvent.change(dateFromInput, { target: { value: dateMock } })

    fireEvent.keyDown(document, { key: 'Escape' })

    expect(props.setFilter).toHaveBeenCalled()
  })

  it('Should clear value in calendar', async () => {
    const dateToInput = screen.getByLabelText('date-filter-to')

    fireEvent.change(dateToInput, { target: { value: dateMock } })

    const clearIcon = screen.getByTestId('clear-icon')

    fireEvent.click(clearIcon)

    expect(props.clearFilter).toHaveBeenCalled()
  })
})
