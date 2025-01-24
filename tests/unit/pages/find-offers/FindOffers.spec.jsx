import { fireEvent, screen, waitFor, act } from '@testing-library/react'
import { afterEach, beforeEach, expect, vi } from 'vitest'
import { mockAxiosClient, renderWithProviders } from '~tests/test-utils'

import FindOffers from '~/pages/find-offers/FindOffers'
import useBreakpoints from '~/hooks/use-breakpoints'
import { useFilterQuery } from '~/hooks/use-filter-query'
import { offersMock } from '~tests/unit/pages/find-offers/FindOffers.constants'
import { URLs } from '~/constants/request'

vi.mock('~/hooks/use-breakpoints')
vi.mock('~/hooks/use-filter-query')

const preloadedState = { appMain: { userRole: 'tutor' } }

const filterQueryMock = {
  filters: {
    categoryId: '',
    subjectId: '',
    sort: 'createdAt',
    language: '',
    native: 'false',
    rating: '0',
    authorRole: 'tutor',
    search: '',
    proficiencyLevel: [],
    price: undefined,
    page: '1'
  },
  activeFilterCount: 0,
  searchParams: {},
  filterQueryActions: {
    updateFilter: vi.fn(),
    resetFilters: vi.fn(),
    updateQueryParams: vi.fn(),
    updateFiltersInQuery: vi.fn()
  }
}

const scrollIntoViewMock = vi.fn()

describe('FindOffers component with data', () => {
  const desktopData = {
    isLaptopAndAbove: true,
    isMobile: false,
    isTablet: false
  }

  beforeEach(async () => {
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock
    mockAxiosClient.onGet(new RegExp(URLs.offers.get)).reply(200, offersMock)
    waitFor(() => {
      useFilterQuery.mockReturnValue(filterQueryMock)
      useBreakpoints.mockImplementation(() => desktopData)
      renderWithProviders(<FindOffers />, {
        preloadedState
      })
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render FindOffers component with data and change role', async () => {
    const toggle = screen.getByRole('checkbox')
    fireEvent.click(toggle)

    expect(
      filterQueryMock.filterQueryActions.updateFiltersInQuery
    ).toHaveBeenCalled()
  })

  it('should open modal window', async () => {
    act(() => {
      const filter = screen.getByText('filters.filtersListTitle')
      fireEvent.click(filter)
    })

    const price = screen.getByText('findOffers.filterTitles.price')
    const applyButton = screen.getByText('button.applyFilters')

    expect(applyButton).toBeInTheDocument()
    expect(price).toBeInTheDocument()
  })

  it('should change page', async () => {
    const secondPage = screen.getByLabelText('Go to page 2')
    fireEvent.click(secondPage)

    expect(scrollIntoViewMock).toHaveBeenCalled()
    expect(
      filterQueryMock.filterQueryActions.updateFiltersInQuery
    ).toHaveBeenCalledTimes(1)
  })
})

describe('FindOffers component without data', () => {
  const desktopData = {
    isLaptopAndAbove: true,
    isMobile: false,
    isTablet: false
  }

  beforeEach(() => {
    mockAxiosClient
      .onGet(new RegExp(URLs.offers.get))
      .reply(200, { items: [], count: 0 })

    useFilterQuery.mockReturnValue(filterQueryMock)
    useBreakpoints.mockImplementation(() => desktopData)
    renderWithProviders(<FindOffers />, {
      preloadedState
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render FindOffers component without data', async () => {
    expect(
      screen.getByText('findOffers.offerRequestBlock.title.tutor')
    ).toBeInTheDocument()
    expect(
      screen.getByText('findOffers.offerRequestBlock.description.tutor')
    ).toBeInTheDocument()
    expect(
      await screen.findByText('findOffers.notFound.description')
    ).toBeInTheDocument()
  })
})

describe('FindOffers component with no scroll', () => {
  const mobileData = {
    isLaptopAndAbove: false,
    isMobile: true,
    isTablet: false
  }

  beforeEach(() => {
    mockAxiosClient.onGet(new RegExp(URLs.offers.get)).reply(200, offersMock)
    useFilterQuery.mockReturnValue(filterQueryMock)
    useBreakpoints.mockImplementation(() => mobileData)
    renderWithProviders(<FindOffers />, {
      preloadedState
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render FindOffers component with data', async () => {
    const existingName = await screen.findByText('Anastasiia Mashchenko')
    expect(existingName).toBeInTheDocument()
  })
})
