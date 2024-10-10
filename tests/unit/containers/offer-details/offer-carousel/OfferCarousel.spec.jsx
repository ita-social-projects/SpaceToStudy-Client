import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import useAxios from '~/hooks/use-axios'
import { vi } from 'vitest'
import OfferCarousel from '~/containers/offer-details/offer-carousel/OfferCarousel'
import { mockOffer } from '~tests/unit/pages/offer-details/OfferDetails.spec.constants'

vi.mock('~/hooks/use-axios')

describe('OfferCarousel test', () => {
  it('should render OfferCarousel', async () => {
    const fakeData = {
      loading: false,
      response: { count: 1, items: [{ ...mockOffer, _id: 'id2' }] }
    }
    useAxios.mockImplementation(() => fakeData)
    renderWithProviders(<OfferCarousel offer={mockOffer} />)

    const title = screen.getByText('findOffers.otherOffers.title')

    expect(title).toBeInTheDocument()
  })
  it('should not render OfferCarousel', async () => {
    const fakeData = {
      loading: false,
      response: { count: 0, items: [] }
    }
    useAxios.mockImplementation(() => fakeData)
    renderWithProviders(<OfferCarousel offer={mockOffer} />)

    const title = screen.queryByText('findOffers.otherOffers.title')

    expect(title).not.toBeInTheDocument()
  })
  it('should not render OfferCardSquare when no offers', async () => {
    const fakeData = {
      loading: false,
      response: { count: 0, items: [] }
    }
    useAxios.mockImplementation(() => fakeData)

    renderWithProviders(<OfferCarousel offer={mockOffer} />)

    const offerCard = screen.queryByTestId('OfferContainer')
    expect(offerCard).not.toBeInTheDocument()
  })
})
