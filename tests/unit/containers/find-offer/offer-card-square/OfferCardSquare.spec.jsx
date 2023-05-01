import { render, screen } from '@testing-library/react'
import { beforeEach, expect } from 'vitest'
import OfferCardSquare from '~/containers/find-offer/offer-card-square/OfferCardSquare'

const mockedOffer = {
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
const intermediatMockOffer = {
  ...mockedOffer,
  proficiencyLevel: 'Intermediate'
}

describe('OfferCardSquare test', () => {
  beforeEach(() => {
    render(<OfferCardSquare offer={mockedOffer} />)
  })

  it('Should render first name correctly', () => {
    const fullName = screen.getByText(
      `${mockedOffer.firstName} ${mockedOffer.lastName}`
    )

    expect(fullName).toBeInTheDocument()
  })

  it('Should render the languages correctly', () => {
    const languages = screen.getByText('Ukrainian, English')

    expect(languages).toBeInTheDocument()
  })

  it('Should render the subject correctly', () => {
    const subject = screen.getByText('English')

    expect(subject).toBeInTheDocument()
  })
  it('Should render price correctly', () => {
    const price = screen.getByText('100 common.uah')

    expect(price).toBeInTheDocument()
  })

  it('renders "Beginner" level text for offer with Beginner proficiency level', () => {
    const levelBeginner = screen.getByText(/Beginner/i)

    expect(levelBeginner).toBeInTheDocument()
  })

  it('renders "Intermediate" level text for offer with Intermediate proficiency level', () => {
    render(<OfferCardSquare offer={intermediatMockOffer} />)
    const levelIntermediate = screen.getByText(/Beginner - INTERMEDIATE/i)

    expect(levelIntermediate).toBeInTheDocument()
  })

  it('Should render correctly SendMessage button', () => {
    const button = screen.getByText('common.labels.sendMessage')

    expect(button).toBeInTheDocument()
  })

  it('Should render correctly viewDetailsButton button', () => {
    const button = screen.getByText('common.labels.viewDetails')

    expect(button).toBeInTheDocument()
  })
})
