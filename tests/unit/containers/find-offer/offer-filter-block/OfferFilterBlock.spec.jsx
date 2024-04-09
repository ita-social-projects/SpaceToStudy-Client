import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { beforeEach } from 'vitest'

import OfferFilterBlock from '~/containers/find-offer/offer-filter-block/OfferFilterBlock'
import { defaultFilters } from '~/pages/find-offers/FindOffers.constants'
import useBreakpoints from '~/hooks/use-breakpoints'

vi.mock('~/hooks/use-breakpoints')

const filterActions = {
  updateFiltersInQuery: vi.fn(),
  resetFilters: vi.fn(),
  updateQueryParams: vi.fn()
}

const price = { minPrice: 200, maxPrice: 400 }
const onToggleTutorOffers = vi.fn()
const closeFilters = vi.fn()
const additionalParams = {}
const activeFilterCount = 2
const open = true
useBreakpoints.mockImplementation(() => ({ isMobile: true }))

describe('OfferFilterBlock', () => {
  beforeEach(async () => {
    await waitFor(() => {
      render(
        <OfferFilterBlock
          activeFilterCount={activeFilterCount}
          additionalParams={additionalParams}
          closeFilters={closeFilters}
          filterActions={filterActions}
          filters={defaultFilters('student')}
          onToggleTutorOffers={onToggleTutorOffers}
          open={open}
          price={price}
        />
      )
    })
  })
  it('renders the component with the correct filters', () => {
    expect(screen.getByText(activeFilterCount)).toBeInTheDocument()
    expect(screen.getAllByRole('combobox')[1]).toHaveValue(
      'common.languages.allLanguages'
    )
  })
  it('should change a language', () => {
    const languageInput = screen.getAllByRole('combobox')[1]

    fireEvent.click(languageInput)
    fireEvent.change(languageInput, {
      target: { value: 'Spanish' }
    })
    fireEvent.keyDown(languageInput, { key: 'ArrowDown' })
    fireEvent.keyDown(languageInput, { key: 'Enter' })

    expect(languageInput.value).toBe('Spanish')
  })
  it('should apply filters', () => {
    const button = screen.getByText('button.applyFilters')
    fireEvent.click(button)

    expect(closeFilters).toBeCalled()
  })
})
