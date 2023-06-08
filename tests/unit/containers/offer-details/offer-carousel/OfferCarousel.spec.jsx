import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import useAxios from '~/hooks/use-axios'
import { vi } from 'vitest'
import OfferCarousel from '~/containers/offer-details/offer-carousel/OfferCarousel'

const mockOffer = {
  _id: 'id',
  authorAvgRating: 4.3,
  description:
    'Hello. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which.',
  languages: ['Ukrainian', 'English'],
  author: {
    firstName: 'James',
    lastName: 'Wilson',
    totalReviews: {
      student: 0,
      tutor: 0
    },
    photo:
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    professionalSummary:
      'Senior lecturer at the Department of German Philology and Translation Department of English Philology Senior lecturer at the Department of German Philology and Translation Department of English Philology Senior lecturer at the Department of German Philology and Translation Department of English Philology'
  },
  price: 100,
  isBookmarked: false,
  category: {
    appearance: 'test'
  },
  subject: {
    id: '12345',
    name: 'English'
  },
  proficiencyLevel: ['Beginner', 'Advanced']
}

vi.mock('~/hooks/use-axios')

describe('OfferCarousel test', () => {
  it('should render OfferCarousel', async () => {
    const fakeData = {
      loading: false,
      response: { count: 1, offers: [{ ...mockOffer, _id: 'id2' }] }
    }
    useAxios.mockImplementation(() => fakeData)
    renderWithProviders(<OfferCarousel offer={mockOffer} />)

    const title = screen.getByText('findOffers.otherOffers.title')

    expect(title).toBeInTheDocument()
  })
  it('should not render OfferCarousel', async () => {
    const fakeData = {
      loading: false,
      response: { count: 0, offers: [] }
    }
    useAxios.mockImplementation(() => fakeData)
    renderWithProviders(<OfferCarousel offer={mockOffer} />)

    const title = screen.queryByText('findOffers.otherOffers.title')

    expect(title).not.toBeInTheDocument()
  })
})
