import { renderWithProviders } from '~tests/test-utils'
import { fireEvent, screen } from '@testing-library/react'
import EnrollOffer from '~/containers/offer-details/enroll-offer/EnrollOffer'

const mockData = {
  _id: '6450b7402ef2f44eb4d2c191',
  price: 170,
  proficiencyLevel: [
    'Beginner',
    'Intermediate',
    'Advanced',
    'Test Preparation'
  ],
  description: 'cvbfbc fd bxc cvbvcb cv b',
  languages: ['Ukrainian'],
  authorRole: 'tutor',
  authorFirstName: 'Yura',
  authorLastName: 'Didenko',
  authorAvgRating: 4,
  author: {
    _id: '644e6b1668cc37f543f2f37c',
    totalReviews: { student: 0, tutor: 2 },
    professionalSummary:
      'Senior lecturer at the Department of German Philology and Translation Department of English Philology',
    photo:
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
  },
  subject: { _id: '6422d995d898aa732d038e8f', name: 'guitar' },
  category: '6421ed8ed991d46a84721dfa',
  status: 'pending',
  createdAt: '2023-05-02T07:09:52.152Z',
  updatedAt: '2023-05-02T07:09:52.152Z'
}

const mockFetchData = vi.fn()

describe('EnrollOffer', () => {
  beforeEach(() => {
    vi.mock('~/services/cooperation-service', () => ({
      cooperationService: {
        createCooperation: () => mockFetchData()
      }
    }))
    renderWithProviders(<EnrollOffer offer={mockData} />)
  })

  it('should display EnrollOffer form', () => {
    const title = screen.getByText('offerDetailsPage.enrollOffer.title')
    expect(title).toBeInTheDocument()
  })
  it('should change proficiencyLevel', () => {
    const newLevel = 'Intermediate'
    const levelSelect = screen.getAllByTestId('app-select')[0]

    fireEvent.change(levelSelect, {
      target: { value: newLevel }
    })

    expect(levelSelect.value).toBe(newLevel)
  })

  it('should send form', () => {
    const button = screen.getByText('button.createCooperation')
    fireEvent.click(button)

    expect(mockFetchData).toBeCalledTimes(1)
  })
})
