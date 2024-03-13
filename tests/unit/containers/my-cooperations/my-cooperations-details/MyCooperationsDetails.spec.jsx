import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import { URLs } from '~/constants/request'
import MyCooperationsDetails from '~/containers/my-cooperations/my-cooperations-details/MyCooperationsDetails.tsx'
import { waitFor, screen } from '@testing-library/react'

const mockedOffer = {
  offer: {
    title: 'Title',
    description: 'Description',
    languages: ['Ukrainian', 'English'],
    author: {
      firstName: 'Michael',
      lastName: 'Scarn',
      photo: '1701182621626.jpg',
      professionalSummary: 'Agent'
    },
    subject: {
      name: 'Algebra'
    },
    category: {
      name: 'Mathematics',
      appearance: {
        color: '#1234'
      }
    },
    proficiencyLevel: ['INTERMEDIATE']
  },
  price: 100
}

describe('MyCooperationsDetails component', () => {
  beforeEach(async () => {
    await waitFor(() => {
      mockAxiosClient.onGet(URLs.cooperations.get).reply(200, mockedOffer)

      renderWithProviders(<MyCooperationsDetails />)
    })
  })

  it('should render title', () => {
    const title = screen.getByText('cooperationDetailsPage.details')

    expect(title).toBeInTheDocument()
  })

  it('should render languages', () => {
    const language1 = screen.getByText('Ukrainian')
    const language2 = screen.getByText('English')

    expect(language1, language2).toBeInTheDocument()
  })
})
