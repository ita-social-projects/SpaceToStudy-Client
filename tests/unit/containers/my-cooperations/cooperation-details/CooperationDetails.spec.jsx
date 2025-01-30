import { screen, waitFor, fireEvent } from '@testing-library/react'
import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import { URLs } from '~/constants/request'

import CooperationDetails from '~/containers/my-cooperations/cooperation-details/CooperationDetails'

const cooperationID = '123456789'
const userId = '33t5ffe34'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useParams: () => ({
      id: cooperationID
    })
  }
})

const mockState = {
  appMain: { userId: userId, userRole: 'tutor' }
}

const cooperationMock = {
  _id: '123456789',
  price: 100,
  proficiencyLevel: 'Beginner',
  status: 'active',
  needAction: {
    role: 'tutor',
    type: 'price',
    messages: []
  },
  title: 'Cooperation title',
  initiator: { _id: userId, role: ['tutor'] },
  receiver: { _id: '123123', role: ['student'] },
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
  user: {
    _id: '123456',
    firstName: 'Name',
    lastName: 'Surname',
    role: 'tutor'
  },
  createdAt: '2024-01-12T11:28:34.397Z',
  updatedAt: '2024-01-12T11:28:34.397Z'
}

vi.mock(
  '~/containers/my-cooperations/cooperation-notes/CooperationNotes',
  () => ({
    default: function () {
      return <div>Cooperation Notes</div>
    }
  })
)

describe('CooperationDetails', () => {
  mockAxiosClient
    .onGet(URLs.cooperations.getById.replace(':id', cooperationID))
    .reply(200, cooperationMock)

  beforeEach(() => {
    renderWithProviders(<CooperationDetails />, { preloadedState: mockState })
  })

  it('should render details page', async () => {
    const notesButton = await screen.findByText(
      'cooperationsPage.details.notes'
    )

    expect(notesButton).toBeInTheDocument()
  })

  it('should show cooperation status and title', () => {
    const title = screen.getByText(cooperationMock.title)
    const statusChip = screen.getByText(cooperationMock.status)

    expect(title).toBeInTheDocument()
    expect(statusChip).toBeInTheDocument()
  })

  it('should render the component with tabs', () => {
    const tab1 = screen.getByText('cooperationsPage.tabs.activities')

    expect(tab1).toBeInTheDocument()

    const tab2 = screen.getByText('cooperationsPage.tabs.details')

    fireEvent.click(tab2)

    expect(tab2).toBeInTheDocument()
  })

  it('should toggle notes block', async () => {
    const notes = await screen.findByRole('button', {
      name: 'cooperationsPage.details.notes'
    })

    fireEvent.click(notes)

    let cooperationNotes = screen.queryByText('Cooperation Notes')

    expect(cooperationNotes).toBeInTheDocument()

    fireEvent.click(notes)

    cooperationNotes = screen.queryByText('Cooperation Notes')

    expect(cooperationNotes).not.toBeInTheDocument()
  })
})
