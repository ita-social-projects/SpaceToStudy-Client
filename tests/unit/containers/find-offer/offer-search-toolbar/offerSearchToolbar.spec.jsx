import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import OfferSearchToolbar from '~/containers/find-offer/offer-search-toolbar/OfferSearchToolbar'
import useBreakpoints from '~/hooks/use-breakpoints'
import { beforeEach } from 'vitest'
import { defaultFilters } from '~/pages/find-offers/FindOffers.constants'

vi.mock('~/hooks/use-breakpoints')
const filterActions = {
  updateFiltersInQuery: vi.fn()
}
const filters = defaultFilters('student')
const resetPage = vi.fn()

vi.mock('~/hooks/use-axios', () => ({
  default: () => ({ loading: false, response: [], fetchData: () => {} })
}))

useBreakpoints.mockImplementation(() => ({ isLaptopAndAbove: true }))

describe('OfferSearchToolbar', () => {
  const testValue = 'Music'

  beforeEach(() => {
    render(
      <OfferSearchToolbar
        filterActions={filterActions}
        filters={filters}
        resetPage={resetPage}
      />
    )
  })

  it('should find right category value', () => {
    const categories = screen.getByLabelText('breadCrumbs.categories')

    fireEvent.click(categories)
    fireEvent.change(categories, { target: { value: testValue } })
    fireEvent.keyDown(categories, { key: 'Enter' })

    expect(categories.value).toBe(testValue)
  })

  it('should find right subject value', () => {
    const subjects = screen.getByLabelText('breadCrumbs.subjects')

    fireEvent.click(subjects)
    fireEvent.change(subjects, { target: { value: testValue } })
    fireEvent.keyDown(subjects, { key: 'Enter' })

    expect(subjects.value).toBe(testValue)
  })

  it('should test search input with button', () => {
    const search = screen.getByRole('textbox')
    const searchBtn = screen.getByText('common.search')

    fireEvent.click(search)
    fireEvent.change(search, { target: { value: testValue } })
    fireEvent.click(searchBtn)

    expect(search.value).toBe(testValue)
  })
})
