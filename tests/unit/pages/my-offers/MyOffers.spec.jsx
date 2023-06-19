import { screen } from '@testing-library/react'
import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import { URLs } from '~/constants/request'

import MyOffers from '~/pages/my-offers/MyOffers'

const mockData = {
  offers: [
    {
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
  ],
  count: 0
}

const userId = mockData.offers.author._id

mockAxiosClient
  .onGet(`${URLs.users.get}/${userId}${URLs.offers.get}`)
  .reply(200, mockData)

describe('MyOffers', () => {
  beforeEach(() => {
    renderWithProviders(<MyOffers />)
  })
  it('should render title on page', async () => {
    const title = screen.getByText('myOffersPage.title')

    expect(title).toBeInTheDocument()
  })
})
