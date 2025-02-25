import { screen, waitFor } from '@testing-library/react'
import { mockAxiosClient, renderWithProviders } from '~tests/test-utils'
import { afterAll, beforeEach, vi } from 'vitest'
import OfferCarousel from '~/containers/offer-details/offer-carousel/OfferCarousel'
import { mockOffer } from '~tests/unit/pages/offer-details/OfferDetails.spec.constants'
import { URLs } from '~/constants/request'
import { userService } from '~/services/user-service'

const mockBookmarkedOffers = ['id2']

describe('OfferCarousel with data', () => {
  beforeAll(() => {
    mockAxiosClient
      .onGet(
        new RegExp(
          URLs.offers.getBySubjectId.replace(
            ':subjectId',
            mockOffer.subject._id
          )
        )
      )
      .reply(200, { items: [{ ...mockOffer, _id: 'id2' }], count: 1 })

    global.ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn()
    }))

    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    }))
  })

  beforeEach(() => {
    renderWithProviders(<OfferCarousel offer={mockOffer} />)
  })

  afterAll(() => {
    vi.clearAllMocks()
  })

  it('should render OfferCarousel', async () => {
    const title = await screen.findByText('findOffers.otherOffers.title')
    expect(title).toBeInTheDocument()
  })

  it('should bookmark offer', async () => {
    mockAxiosClient
      .onPatch(
        URLs.users.updateBookmarks
          .replace(':userId', mockOffer.author._id)
          .replace(':offerId', mockOffer._id)
      )
      .reply(200, mockBookmarkedOffers)

    const result = await userService.toggleBookmark(
      mockOffer.author._id,
      mockOffer._id
    )

    expect(result).toEqual(mockBookmarkedOffers)
  })
})

describe('OfferCarousel without data', () => {
  beforeAll(() => {
    mockAxiosClient
      .onGet(
        new RegExp(
          URLs.offers.getBySubjectId.replace(
            ':subjectId',
            mockOffer.subject._id
          )
        )
      )
      .reply(200, { items: [], count: 0 })
  })

  beforeEach(() => {
    renderWithProviders(<OfferCarousel offer={mockOffer} />)
  })

  afterAll(() => {
    vi.clearAllMocks()
  })

  it('should not render OfferCarousel when no suggested offers', async () => {
    await waitFor(() => {
      const title = screen.queryByText('findOffers.otherOffers.title')
      expect(title).not.toBeInTheDocument()
    })
  })

  it('should not render OfferCardSquare when no offers', () => {
    const offerCard = screen.queryByTestId('OfferContainer')
    expect(offerCard).not.toBeInTheDocument()
  })
})
