import { expect, vi } from 'vitest'
import { screen, render, fireEvent } from '@testing-library/react'
import { beforeEach } from 'vitest'
import { defaultFilters } from '~/pages/find-offers/FindOffers.constants'

import FilterBarMenu from '~/containers/find-offer/filter-bar-menu/FilterBarMenu'
import useBreakpoints from '~/hooks/use-breakpoints'

vi.mock('~/hooks/use-breakpoints')

const mockChosenFiltersQty = 2
const mockUpdateFilter = vi.fn()
const mockResetPage = vi.fn()
const toggleFilters = vi.fn()
const mockHandleOffersView = vi.fn()
const mockOnToggleTutorOffers = vi.fn()

describe('OfferFilterBlock', () => {
  beforeEach(() => {
    useBreakpoints.mockImplementation(() => ({ isLaptopAndAbove: true }))
    render(
      <FilterBarMenu
        chosenFiltersQty={mockChosenFiltersQty}
        filters={defaultFilters('createdAt')}
        handleOffersView={mockHandleOffersView}
        onToggleTutorOffers={mockOnToggleTutorOffers}
        resetPage={mockResetPage}
        toggleFilters={toggleFilters}
        updateFilter={mockUpdateFilter}
      />
    )
  })

  it('correctly render filters and toggle filters', () => {
    const filterBtn = screen.getByText('filters.filtersListTitle')

    expect(filterBtn).toBeInTheDocument()

    fireEvent.click(filterBtn)

    expect(toggleFilters).toBeCalled()
  })
  it('it calls updaterFilter when AppSelect value changes', () => {
    const appSelect = screen.getByTestId('app-select')

    fireEvent.click(appSelect)
    fireEvent.change(appSelect, {
      target: { value: 'rating' }
    })

    expect(mockUpdateFilter).toHaveBeenCalled()
  })
  it('it checks that app switcher exists on desktop size', () => {
    expect(screen.getByTestId('switch')).toBeInTheDocument()
  })
})

describe('OfferBarMenu tests on tablet size', () => {
  beforeEach(() => {
    useBreakpoints.mockImplementation(() => ({ isLaptopAndAbove: false }))
    render(
      <FilterBarMenu
        chosenFiltersQty={mockChosenFiltersQty}
        filters={defaultFilters('createdAt')}
        handleOffersView={mockHandleOffersView}
        onToggleTutorOffers={mockOnToggleTutorOffers}
        toggleFilters={toggleFilters}
        updateFilter={mockUpdateFilter}
      />
    )
  })

  it('it checks that app switcher does not exist on tablet size', () => {
    expect(screen.queryByTestId('switch')).not.toBeInTheDocument()
  })
})

describe('OfferBarMenu tests on mobile size', () => {
  beforeEach(() => {
    useBreakpoints.mockImplementation(() => ({ isMobile: true }))
    render(
      <FilterBarMenu
        chosenFiltersQty={mockChosenFiltersQty}
        filters={defaultFilters('createdAt')}
        handleOffersView={mockHandleOffersView}
        onToggleTutorOffers={mockOnToggleTutorOffers}
        toggleFilters={toggleFilters}
        updateFilter={mockUpdateFilter}
      />
    )
  })

  it('it checks that app select block does not exist on mobile size', () => {
    expect(screen.queryByTestId('app-select-block')).not.toBeInTheDocument()
  })
})
