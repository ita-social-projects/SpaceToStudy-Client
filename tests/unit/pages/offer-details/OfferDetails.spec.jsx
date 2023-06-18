import { vi } from 'vitest'
import { screen } from '@testing-library/react'
import { URLs } from '~/constants/request'
import OfferDetails from '~/pages/offer-details/OfferDetails'
import useBreakpoints from '~/hooks/use-breakpoints'
import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import { mockOffer } from '~tests/unit/pages/offer-details/OfferDetails.spec.constants'

vi.mock('~/hooks/use-breakpoints')
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useParams: () => ({
      id: mockOffer._id
    }),
    useOutletContext: () => ({
      data: mockOffer
    })
  }
})

const mockState = {
  appMain: { userRole: 'tutor' }
}

mockAxiosClient
  .onGet(`${URLs.offers.get}/${mockOffer._id}`)
  .reply(200, mockOffer)
mockAxiosClient
  .onGet(`${URLs.categories.get}${URLs.subjects.get}${URLs.offers.get}`)
  .reply(200, { offers: [], count: 0 })

describe('OfferDetails on desktop', () => {
  const desktopData = {
    isLaptopAndAbove: true,
    isMobile: false,
    isTablet: false
  }
  beforeEach(() => {
    useBreakpoints.mockImplementation(() => desktopData)

    renderWithProviders(<OfferDetails />, {
      preloadedState: mockState
    })
  })

  it('should display the offer details correctly', async () => {
    const price = await screen.findByText(mockOffer.price)
    const authorAvgRating = screen.getByText(
      mockOffer.author.averageRating.tutor
    )
    const title = await screen.findByText(mockOffer.title)
    const name = await screen.findByText(
      `${mockOffer.author.firstName} ${mockOffer.author.lastName[0]}.`
    )

    expect(price).toBeInTheDocument()
    expect(authorAvgRating).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(name).toBeInTheDocument()
  })
})

describe('OfferDetails on mobile', () => {
  const desktopData = {
    isLaptopAndAbove: false,
    isMobile: true,
    isTablet: false
  }
  beforeEach(() => {
    useBreakpoints.mockImplementation(() => desktopData)

    renderWithProviders(<OfferDetails />, {
      preloadedState: mockState
    })
  })

  it('should display the offer details correctly', async () => {
    const authorAvgRating = screen.getByText(
      mockOffer.author.averageRating.tutor
    )
    const title = await screen.findByText(mockOffer.title)
    const name = await screen.findByText(
      `${mockOffer.author.firstName} ${mockOffer.author.lastName}`
    )

    expect(authorAvgRating).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(name).toBeInTheDocument()
  })
})
