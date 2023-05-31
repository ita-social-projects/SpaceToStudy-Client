import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import { URLs } from '~/constants/request'

import MyCooperations from '~/pages/my-cooperations/MyCooperations'

mockAxiosClient.onGet(URLs.cooperations.get).reply(200, {
  items: [
    {
      _id: 'id',
      offer: {
        description:
          'Hello. There are many variations of passages of There are many variations of passages of... Hello. There are many variations of passages of There are many variations of passages of... Hello. There are many variations of passages of There are many variations of passages of... Hello. There are many variations of passages of There are many variations of passages of... Hello. There are many variations of passages of There are many variations of passages of... Hello. There are many variations of passages of There are many variations of passages of... Hello. There are many variations of passages of There are many variations of passages of... ',
        subject: { _id: 'id', name: 'Quantum Mechanics' }
      },
      user: {
        firstName: 'Kathryn',
        lastName: 'Murphy',
        photo:
          'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
      },
      price: 1800,
      proficiencyLevel: 'Beginner',
      status: 'pending'
    }
  ],
  count: 0
})

describe('MyCooperations', () => {
  beforeEach(() => {
    renderWithProviders(<MyCooperations />)
  })
  it('should render title on page', async () => {
    const title = screen.getByText('cooperationsPage.title')

    expect(title).toBeInTheDocument()
  })
  it('should change tab', () => {
    const activeTab = screen.getByText('cooperationsPage.tabs.active')

    fireEvent.click(activeTab)

    const coopCard = screen.queryAllByText('Beginner')

    expect(coopCard.length).toBe(0)
  })
})
