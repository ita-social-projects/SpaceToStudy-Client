import { fireEvent, render } from '@testing-library/react'
import FiltersToggle from '~/components/filters-toggle/FiltersToggle'
import { expect, vi } from 'vitest'

const mockedHandleToggle = vi.fn()

const mockedToggleId = 'toggle-button'
const mockedFiltersQtyId = 'filters-qty'

describe('FiltersToggle component', () => {
  it('should perform toggling filters', () => {
    const { getByTestId } = render(
      <FiltersToggle chosenFiltersQty={0} handleToggle={mockedHandleToggle} />
    )

    const toggleButton = getByTestId(mockedToggleId)

    fireEvent.click(toggleButton)

    expect(mockedHandleToggle).toHaveBeenCalled()
  })

  it('should show quantity of chosen filters', () => {
    const { getByTestId } = render(
      <FiltersToggle chosenFiltersQty={1} handleToggle={mockedHandleToggle} />
    )

    const filtersQty = getByTestId(mockedFiltersQtyId)

    expect(filtersQty).toBeInTheDocument()
  })
})
