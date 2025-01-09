import { fireEvent, screen, waitFor, act } from '@testing-library/react'

import FindOffers from '~/pages/find-offers/FindOffers'

import { renderWithProviders } from '~tests/test-utils'
import useBreakpoints from '~/hooks/use-breakpoints'
import { useFilterQuery } from '~/hooks/use-filter-query'

import { offersMock } from '~tests/unit/pages/find-offers/FindOffers.constants'
import useQuery from '~/hooks/use-query'

vi.mock('~/hooks/use-breakpoints')
vi.mock('~/hooks/use-filter-query')
vi.mock('~/hooks/use-query')

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

describe('FindOffers component', () => {
  const desktopData = {
    isLaptopAndAbove: true,
    isMobile: false,
    isTablet: false
  }
  beforeEach(async () => {
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock
    await waitFor(() => {
      useFilterQuery.mockReturnValue(filterQueryMock)
      useBreakpoints.mockImplementation(() => desktopData)
      useQuery.mockReturnValue({
        data: offersMock,
        isLoading: false,
        isError: false
      })
      renderWithProviders(<FindOffers />, {
        preloadedState
      })
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should renders FindOffers component with data and change role', async () => {
    await waitFor(() => {
      const toggle = screen.getByRole('checkbox')
      fireEvent.click(toggle)

      expect(
        filterQueryMock.filterQueryActions.updateFiltersInQuery
      ).toHaveBeenCalled()
    })
  })

  it('should open modal window', async () => {
    await act(() => {
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

describe('FindOffers component', () => {
  const desktopData = {
    isLaptopAndAbove: true,
    isMobile: false,
    isTablet: false
  }
  beforeEach(async () => {
    await waitFor(() => {
      useFilterQuery.mockReturnValue(filterQueryMock)
      useBreakpoints.mockImplementation(() => desktopData)
      useQuery.mockReturnValue({
        data: { items: [], count: 0 },
        isLoading: false,
        isError: false
      })
      renderWithProviders(<FindOffers />, {
        preloadedState
      })
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should renders FindOffers component without data', async () => {
    expect(
      screen.getByText('findOffers.offerRequestBlock.title.tutor')
    ).toBeInTheDocument()
    expect(
      screen.getByText('findOffers.offerRequestBlock.description.tutor')
    ).toBeInTheDocument()
    expect(
      screen.getByText(/findOffers\.notFound\.description/i)
    ).toBeInTheDocument()
  })
})

describe('FindOffers component', () => {
  const mobileData = {
    isLaptopAndAbove: false,
    isMobile: true,
    isTablet: false
  }
  beforeEach(async () => {
    await waitFor(() => {
      useFilterQuery.mockReturnValue(filterQueryMock)
      useBreakpoints.mockImplementation(() => mobileData)
      useQuery.mockReturnValue({
        data: offersMock,
        isLoading: false,
        isError: false
      })
      renderWithProviders(<FindOffers />, {
        preloadedState
      })
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should renders FindOffers component with data and change role', async () => {
    const existingName = screen.getByText('Anastasiia Mashchenko')
    expect(existingName).toBeInTheDocument()
  })
})
