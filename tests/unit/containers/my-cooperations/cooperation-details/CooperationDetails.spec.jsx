import { screen, fireEvent } from '@testing-library/react'
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

const mockStateTutor = {
  appMain: { userId: userId, userRole: 'tutor' }
}

const mockStateStudent = {
  appMain: { userId: userId, userRole: 'student' }
}

const cooperationData = {
  _id: '123456789',
  price: 100,
  proficiencyLevel: 'Beginner',
  status: 'request to close',
  title: 'Cooperation title',
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

const OPPOSITE_USER_DECIDED_TO_CLOSE_COOPERATION = {
  ...cooperationData,
  needAction: {
    role: 'tutor',
    type: 'waiting for approval',
    messages: []
  },
  initiator: { _id: userId, role: ['tutor'] },
  receiver: { _id: '123123', role: ['student'] }
}

const OPPOSITE_USER_DECLINED_TO_CLOSE_COOPERATION = {
  ...cooperationData,
  needAction: {
    role: 'student',
    type: 'waiting for answer',
    messages: ['reason1']
  },
  initiator: { _id: userId, role: ['student'] },
  receiver: { _id: '123123', role: ['tutor'] }
}

const USER_SUBMITTED_AN_ANSWER = {
  ...cooperationData,
  needAction: {
    role: 'student',
    type: 'waiting for approval',
    messages: ['message1']
  },
  initiator: { _id: userId, role: ['tutor'] },
  receiver: { _id: '123123', role: ['student'] }
}

const USER_SUBMITTED_A_REASON_FOR_DECLINING = {
  ...cooperationData,
  needAction: {
    role: 'tutor',
    type: 'waiting for answer',
    messages: ['reason1']
  },
  initiator: { _id: userId, role: ['student'] },
  receiver: { _id: '123123', role: ['tutor'] }
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
  beforeAll(() => {
    mockAxiosClient
      .onGet(URLs.cooperations.getById.replace(':id', cooperationID))
      .reply(200, OPPOSITE_USER_DECIDED_TO_CLOSE_COOPERATION)
  })

  beforeEach(() => {
    renderWithProviders(<CooperationDetails />, { preloadedState: mockStateTutor })
  })

  afterAll(() => {
    mockAxiosClient.reset()
  })

  it('should render details page', async () => {
    const notesButton = await screen.findByText(
      'cooperationsPage.details.notes'
    )

    expect(notesButton).toBeInTheDocument()
  })

  it('should show cooperation status and title', () => {
    const title = screen.getByText(
      OPPOSITE_USER_DECIDED_TO_CLOSE_COOPERATION.title
    )
    const statusChip = screen.getByText('need action')

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

  it('should render AcceptCooperationClosing modal when needAction type is "waiting for approval" and role equals users role', () => {
    const cooperationClosingModal = screen.getByText(
      'titles.acceptCooperationClosing'
    )
    expect(cooperationClosingModal).toBeInTheDocument()
  })
})

describe('CooperationClosureDeclinedBanner without answer being submitted', () => {
  beforeAll(() => {
    mockAxiosClient.reset()
    mockAxiosClient
      .onGet(URLs.cooperations.getById.replace(':id', cooperationID))
      .reply(200, OPPOSITE_USER_DECLINED_TO_CLOSE_COOPERATION)
  })

  beforeEach(() => {
    renderWithProviders(<CooperationDetails />, { preloadedState: mockStateStudent })
  })

  it('should render CooperationClosureDeclinedBanner when needAction type is "waiting for answer" and role equals users role', async () => {
    const cooperationClosingModal = await screen.findByText(
      'titles.cooperationClosureDeclined'
    )
    expect(cooperationClosingModal).toBeInTheDocument()
  })
})

describe('CooperationClosureDeclinedBanner with submitted answer', () => {
  beforeAll(() => {
    mockAxiosClient.reset()
    mockAxiosClient
      .onGet(URLs.cooperations.getById.replace(':id', cooperationID))
      .reply(200, USER_SUBMITTED_AN_ANSWER)
  })

  beforeEach(() => {
    renderWithProviders(<CooperationDetails />, { preloadedState: mockStateTutor })
  })

  it('should render CooperationClosureDeclinedBanner when needAction type is "waiting for approval" and role is not the same as users role', async () => {
    const cooperationClosingModal = await screen.findByText(
      'titles.cooperationClosureDeclined'
    )
    expect(cooperationClosingModal).toBeInTheDocument()
  })
})

describe('AcceptCooperationClosing modal with submitted answer', () => {
  beforeAll(() => {
    mockAxiosClient.reset()
    mockAxiosClient
      .onGet(URLs.cooperations.getById.replace(':id', cooperationID))
      .reply(200, USER_SUBMITTED_A_REASON_FOR_DECLINING)
  })

  beforeEach(() => {
    renderWithProviders(<CooperationDetails />, { preloadedState: mockStateStudent })
  })

  it('should render AcceptCooperationClosing modal when needAction type is "waiting for answer" and role is not the same as users role', async () => {
    const cooperationClosingModal = screen.getByText(
      'titles.acceptCooperationClosing'
    )
    expect(cooperationClosingModal).toBeInTheDocument()
  })
})
