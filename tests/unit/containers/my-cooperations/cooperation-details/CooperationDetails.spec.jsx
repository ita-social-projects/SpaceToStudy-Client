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
  needAction: 'tutor',
  offer: {
    _id: 'asdf1234',
    price: 100,
    title: 'Cooperation title',
    category: {
      _id: '12345',
      name: 'Music'
    },
    subject: {
      _id: 'as123',
      name: 'Piano'
    }
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

describe('CooperationDetails', () => {
  beforeEach(async () => {
    await waitFor(() => {
      renderWithProviders(<CooperationDetails />, { preloadedState: mockState })
      mockAxiosClient
        .onGet(`${URLs.cooperations.get}/${cooperationID}`)
        .reply(200, cooperationMock)
    })
  })

  it('should render details page', () => {
    const notesButton = screen.getByText('cooperationsPage.details.notes')
    expect(notesButton).toBeInTheDocument()
  })

  it('should show cooperation status and title', () => {
    const title = screen.getByText(cooperationMock.offer.title)
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

  it('should toggle notes block', () => {
    const notes = screen.getByText('cooperationsPage.details.notes')

    fireEvent.click(notes)

    const notesIcon = screen.getAllByTestId('AddIcon')[1]

    expect(notesIcon).toBeInTheDocument()

    fireEvent.click(notes)

    expect(notesIcon).not.toBeInTheDocument()
  })
})
