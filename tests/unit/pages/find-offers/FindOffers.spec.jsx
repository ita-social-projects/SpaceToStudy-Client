import { fireEvent, screen } from '@testing-library/react'
import FindOffers from '~/pages/find-offers/FindOffers'
import { mockAxiosClient } from '~tests/test-utils'
import { URLs } from '~/constants/request'
import { renderWithProviders } from '~tests/test-utils'
import { createUrlPath } from '~/utils/helper-functions'
import { OfferService } from '~/services/offer-service'
import { offersMock } from '~tests/unit/pages/find-offers/findOffers.constants'
import useBreakpoints from '~/hooks/use-breakpoints'
import { useFilterQuery } from '~/hooks/use-filter-query'

vi.mock('~/hooks/use-breakpoints')
vi.mock('~/hooks/use-filter-query')

const preloadedState = { appMain: { userRole: 'tutor' } }
const category = createUrlPath(URLs.categories.get, '')
const subject = createUrlPath(URLs.subjects.get, '')

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
    updateFilterInQuery: vi.fn()
  }
}

describe('FindOffers component', () => {
  const desktopData = {
    isLaptopAndAbove: true,
    isMobile: false,
    isTablet: false
  }
  beforeEach(() => {
    useFilterQuery.mockReturnValue(filterQueryMock)
    useBreakpoints.mockImplementation(() => desktopData)
    renderWithProviders(<FindOffers />, {
      preloadedState
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should renders FindOffers component without data', async () => {
    mockAxiosClient
      .onGet(`${category}${subject}${URLs.offers.get}`)
      .reply(200, { items: [], count: 0 })

    const result = await OfferService.getOffers({})

    expect(result.status).toEqual(200)
    expect(
      screen.getByText('findOffers.offerRequestBlock.title.tutor')
    ).toBeInTheDocument()
    expect(
      screen.getByText('findOffers.offerRequestBlock.description')
    ).toBeInTheDocument()
    expect(
      screen.getByText('findOffers.notFound.description')
    ).toBeInTheDocument()
  })

  it('should renders FindOffers component with data and change role', async () => {
    mockAxiosClient
      .onGet(`${category}${subject}${URLs.offers.get}`)
      .reply(200, offersMock)

    const result = await OfferService.getOffers({})

    expect(result.status).toEqual(200)

    const toggle = screen.getByRole('checkbox')

    fireEvent.click(toggle)

    expect(
      filterQueryMock.filterQueryActions.updateFilterInQuery
    ).toHaveBeenCalled()
  })

  it('should open modal window', async () => {
    mockAxiosClient
      .onGet(`${category}${subject}${URLs.offers.get}`)
      .reply(200, offersMock)

    const result = await OfferService.getOffers({})

    expect(result.status).toEqual(200)

    const filter = screen.getByText('filters.filtersListTitle')
    fireEvent.click(filter)

    const price = screen.getByText('findOffers.filterTitles.price')
    const applyButton = screen.getByText('button.applyFilters')

    expect(applyButton).toBeInTheDocument()
    expect(price).toBeInTheDocument()
  })

  it('should change page', async () => {
    mockAxiosClient
      .onGet(`${category}${subject}${URLs.offers.get}`)
      .reply(200, offersMock)

    const result = await OfferService.getOffers({})

    expect(result.status).toEqual(200)

    const secondPage = screen.getByLabelText('Go to page 2')

    fireEvent.click(secondPage)

    expect(
      filterQueryMock.filterQueryActions.updateFilterInQuery
    ).toHaveBeenCalledTimes(1)
  })
})

describe('FindOffers component', () => {
  const mobileData = {
    isLaptopAndAbove: false,
    isMobile: true,
    isTablet: false
  }
  beforeEach(() => {
    useFilterQuery.mockReturnValue(filterQueryMock)
    useBreakpoints.mockImplementation(() => mobileData)
    renderWithProviders(<FindOffers />, {
      preloadedState
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should renders FindOffers component with data and change role', async () => {
    mockAxiosClient
      .onGet(`${category}${subject}${URLs.offers.get}`)
      .reply(200, offersMock)

    const result = await OfferService.getOffers({})

    expect(result.status).toEqual(200)

    const existingName = screen.getByText('Anastasiia Mashchenko')

    expect(existingName).toBeInTheDocument()
  })
})
