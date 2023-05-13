import { vi } from 'vitest'

import { screen, fireEvent } from '@testing-library/react'
import { beforeEach, expect } from 'vitest'
import OfferCardSquare from '~/containers/find-offer/offer-card-square/OfferCardSquare'
import { renderWithProviders } from '~tests/test-utils'

const mockOffer = {
  _id: 'id',
  authorAvgRating: 4.3,
  authorFirstName: 'James',
  authorLastName: 'Wilson',
  description:
    'Hello. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which.',
  languages: ['Ukrainian', 'English'],
  author: {
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
  subject: {
    id: '12345',
    name: 'English'
  },
  proficiencyLevel: ['Beginner', 'Advanced']
}

const onBookmarkClick = vi.fn()
const buttonActions = [
  { label: 'Action 1', handleClick: vi.fn() },
  { label: 'Action 2', handleClick: vi.fn() }
]

describe('OfferCardSquare test', () => {
  beforeEach(() => {
    renderWithProviders(
      <OfferCardSquare
        buttonActions={buttonActions}
        offer={mockOffer}
        onBookmarkClick={onBookmarkClick}
      />
    )
  })

  it('Should render first name correctly', () => {
    const fullName = screen.getByText('James Wilson')

    expect(fullName).toBeInTheDocument()
  })

  it('Should render languages correctly', () => {
    const language = screen.getByText(`${mockOffer.languages.join(', ')}`)

    expect(language).toBeInTheDocument()
  })

  it('Should correctly display price', () => {
    const price = screen.getByText('100 common.uah')

    expect(price).toBeInTheDocument()
  })

  it('renders the author photo', () => {
    const authorPhoto = screen.getByRole('img')

    expect(authorPhoto).toBeInTheDocument()
  })

  it('renders the proficiency level', () => {
    const proficiencyLevel = screen.getByText('COMMON.BEGINNER - ADVANCED')

    expect(proficiencyLevel).toBeInTheDocument()
  })

  it('renders the send message button', () => {
    const sendMessageButton = screen.getByRole('button', {
      name: 'Action 1'
    })

    expect(sendMessageButton).toBeInTheDocument()
  })

  it('renders the view details button', () => {
    const viewDetailsButton = screen.getByRole('button', {
      name: 'Action 2'
    })
    expect(viewDetailsButton).toBeInTheDocument()
  })

  it('renders the bookmark button', () => {
    const bookmarkButton = screen.getByTestId('bookmark-icon')

    fireEvent.click(bookmarkButton)

    expect(onBookmarkClick).toHaveBeenCalledWith('id')
  })
})
