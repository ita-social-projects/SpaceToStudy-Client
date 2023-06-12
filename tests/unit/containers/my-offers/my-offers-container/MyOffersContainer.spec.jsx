import { vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import MyOffersContainer from '~/containers/my-offers/my-offers-container/MyOffersContainer'

const offerMock = {
  _id: 'id',
  authorRole: 'tutor',
  title: 'Test title',
  author: {
    _id: 'id',
    firstName: 'Kathryn',
    lastName: 'Murphy',
    averageRating: {
      student: 0,
      tutor: 0
    },
    totalReviews: {
      student: 0,
      tutor: 0
    },
    photo:
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
  },
  subject: { _id: 'id', name: 'Quantum Mechanics' },
  description:
    'Hello. There are many variations of passages of There are many variations of passages of... Hello. There are many variations of passages of There are many variations of passages of... Hello. There are many variations of passages of There are many variations of passages of... Hello. There are many variations of passages of There are many variations of passages of... Hello. There are many variations of passages of There are many variations of passages of... Hello. There are many variations of passages of There are many variations of passages of... Hello. There are many variations of passages of There are many variations of passages of... ',
  price: 1800,
  proficiencyLevel: 'Beginner',
  status: 'pending'
}

const sortOptionsMock = {
  sort: { orderBy: 'name', order: 'asc' },
  onRequestSort: () => vi.fn()
}

describe('MyOffersContainer component ', () => {
  beforeEach(() => {
    renderWithProviders(
      <MyOffersContainer items={[offerMock]} sort={sortOptionsMock} />
    )
  })

  it('should render card in container', () => {
    const title = screen.getByText(offerMock.title)

    expect(title).toBeInTheDocument()
  })
})
