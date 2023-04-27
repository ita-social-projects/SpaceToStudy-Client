import { render, screen } from '@testing-library/react'
import OfferContainer from '~/containers/find-offer/offer-container/OfferContainer'
import useBreakpoints from '~/hooks/use-breakpoints'
import { vi } from 'vitest'

vi.mock('~/hooks/use-breakpoints')

const mockOfferSquareCard = {
  id: 'id',
  photo:
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
  rating: 4.3,
  firstName: 'Andrew',
  lastName: 'Wilson',
  bio: 'Senior lecturer at the Department of German Philology and Translation Department of English Philology Senior lecturer at the Department of German Philology and Translation Department of English Philology Senior lecturer at the Department of German Philology and Translation Department of English Philology',
  description:
    'Hello. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which.',
  languages: ['Ukrainian', 'English'],
  price: 100,
  subject: 'English',
  proficiencyLevel: 'Beginner',
  totalReviews: 33,
  averageRating: 4.8
}

const cardsViewEnums = {
  grid: 'grid',
  inline: 'inline'
}

const mockOffers = new Array(6).fill(mockOfferSquareCard)

describe('OfferContainer test on modile', () => {
  const mobileData = { isDesktop: false, isMobile: true, isTablet: false }

  it('Test should render square card component on modile', () => {
    useBreakpoints.mockImplementation(() => mobileData)
    render(
      <OfferContainer
        offerCards={mockOffers}
        viewMode={cardsViewEnums.inline}
      />
    )
    const starIcon = screen.getAllByTestId('star-icon')

    expect(starIcon).toHaveLength(6)
  })
})

describe('OfferContainer test on tablet', () => {
  const mobileData = { isDesktop: false, isMobile: false, isTablet: true }

  it('Test should render rectangular card on tablet', () => {
    useBreakpoints.mockImplementation(() => mobileData)
    render(
      <OfferContainer offerCards={mockOffers} viewMode={cardsViewEnums.grid} />
    )
    const ratingIcon = screen.getAllByTestId('app-rating')

    expect(ratingIcon).toHaveLength(6)
  })
})

describe('OfferContainer test on desktop', () => {
  const mobileData = { isDesktop: true, isMobile: false, isTablet: false }

  it('Test should render rectangular card on desktop with grid viewMode', () => {
    useBreakpoints.mockImplementation(() => mobileData)
    render(
      <OfferContainer offerCards={mockOffers} viewMode={cardsViewEnums.grid} />
    )

    const starIcon = screen.getAllByTestId('star-icon')

    expect(starIcon).toHaveLength(6)
  })

  it('Test should render rectangular card on desktop with inline viewMode', () => {
    useBreakpoints.mockImplementation(() => mobileData)
    render(
      <OfferContainer
        offerCards={mockOffers}
        viewMode={cardsViewEnums.inline}
      />
    )

    const ratingIcon = screen.getAllByTestId('app-rating')

    expect(ratingIcon).toHaveLength(6)
  })
})
