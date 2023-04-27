import { render, screen } from '@testing-library/react'
import OfferContainer from '~/containers/find-offer/offer-container/OfferContainer'

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

describe('OfferContainer test', () => {
  it('Test should render OfferContainer component', () => {
    render(
      <OfferContainer
        offerCards={mockOffers}
        viewMode={cardsViewEnums.inline}
      />
    )
    const offerContainer = screen.getByTestId('OfferContainer')

    expect(offerContainer).toBeInTheDocument()
  })
})
