import { render, screen, fireEvent } from '@testing-library/react'
import { beforeEach } from 'vitest'
import OfferFilterBlock from '~/containers/find-offer/offer-filter-block/OfferFilterBlock'
import { defaultFilters } from '~/pages/find-offers/FindOffers.constants'
import useBreakpoints from '~/hooks/use-breakpoints'

vi.mock('~/hooks/use-breakpoints')

const filterActions = {
  updateFilter: vi.fn(),
  resetFilters: vi.fn(),
  updateQueryParams: vi.fn()
}

const onToggleTutorOffers = vi.fn()
const closeFilters = vi.fn()
const activeFilterCount = 2
const open = true
useBreakpoints.mockImplementation(() => ({ isMobile: true }))

describe('OfferFilterBlock', () => {
  beforeEach(() => {
    render(
      <OfferFilterBlock
        activeFilterCount={activeFilterCount}
        closeFilters={closeFilters}
        filterActions={filterActions}
        filters={defaultFilters}
        onToggleTutorOffers={onToggleTutorOffers}
        open={open}
      />
    )
  })
  it('renders the component with the correct filters', () => {
    expect(screen.getByText(activeFilterCount)).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toHaveValue(
      'common.languages.allLanguages'
    )
  })
  it('should change a language', () => {
    const languageInput = screen.getByRole('combobox')

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
