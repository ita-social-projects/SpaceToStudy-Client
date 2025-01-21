import { screen, waitFor, fireEvent } from '@testing-library/react'
import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import { URLs } from '~/constants/request'
import {
  ProficiencyLevelEnum,
  StatusEnum,
  UserRoleEnum,
  LanguagesEnum,
  UserStatusEnum
} from '~/types'

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
  _id: 'default-id',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  offer: {
    subject: {
      _id: 'someId',
      name: 'Default Subject'
    },
    title: 'Default Offer Title',
    category: {
      _id: 'someId',
      name: 'Default Category',
      appearance: {
        icon: 'icon',
        color: 'red'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      totalOffers: {
        student: 1,
        tutor: 1
      }
    },
    price: 0,
    _id: 'default-offer-id',
    chatId: 'default-chat-id',
    languages: [LanguagesEnum.English],
    author: {
      _id: 'author-id',
      totalReviews: { student: 10, tutor: 5 },
      photo: 'https://example.com/photo.jpg',
      professionalSummary: 'An experienced tutor in math and science.',
      firstName: 'John',
      lastName: 'Doe',
      FAQ: { student: [], tutor: [] },
      averageRating: { student: 4.8, tutor: 4.9 }
    },
    proficiencyLevel: [ProficiencyLevelEnum.Beginner],
    description: 'Default offer description'
  },
  user: {
    firstName: 'Default',
    lastName: 'User',
    photo: null,
    _id: 'default-user-id',
    role: UserRoleEnum.Student
  },
  initiator: {
    _id: 'default-initiator-id',
    role: [],
    firstName: 'Default',
    lastName: 'Initiator',
    email: 'initiator@example.com',
    mainSubjects: { student: [], tutor: [] },
    totalReviews: { student: 0, tutor: 0 },
    averageRating: { student: 0, tutor: 0 },
    nativeLanguage: null,
    address: {
      city: 'Default City',
      country: 'Default Country'
    },
    professionalSummary: '',
    photo: null,
    lastLogin: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    FAQ: {
      student: [],
      tutor: []
    },
    videoLink: {
      student: '',
      tutor: ''
    },
    professionalBlock: undefined,
    aboutStudent: undefined,
    status: {
      student: UserStatusEnum.Active,
      tutor: UserStatusEnum.Active
    },
    notificationSettings: {
      isOfferStatusNotification: true,
      isChatNotification: false,
      isSimilarOffersNotification: false,
      isEmailNotification: false
    },
    bookmarkedOffers: [],
    lastSeen: null
  },
  initiatorRole: 'student',
  title: 'Default Cooperation Title',
  price: 0,
  proficiencyLevel: ProficiencyLevelEnum.Beginner,
  chatId: 'default-chat-id',
  status: StatusEnum.Pending,
  needAction: UserRoleEnum.Student,
  receiver: {
    _id: 'default-receiver-id',
    role: [],
    firstName: 'Default',
    lastName: 'Receiver',
    email: 'receiver@example.com',
    mainSubjects: { student: [], tutor: [] },
    totalReviews: { student: 0, tutor: 0 },
    averageRating: { student: 0, tutor: 0 },
    nativeLanguage: null,
    address: {
      city: 'Default City',
      country: 'Default Country'
    },
    professionalSummary: '',
    photo: null,
    lastLogin: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    FAQ: {
      student: [],
      tutor: []
    },
    videoLink: {
      student: '',
      tutor: ''
    },
    professionalBlock: undefined,
    aboutStudent: undefined,
    status: {
      student: UserStatusEnum.Active,
      tutor: UserStatusEnum.Active
    },
    notificationSettings: {
      isOfferStatusNotification: true,
      isChatNotification: false,
      isSimilarOffersNotification: false,
      isEmailNotification: false
    },
    bookmarkedOffers: [],
    lastSeen: null
  },
  receiverRole: 'tutor',
  sections: [
    {
      id: 'default-section-id',
      title: 'Default Section Title',
      description: 'Default Section Description',
      resources: []
    }
  ]
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

  beforeEach(async () => {
    await waitFor(() => {
      renderWithProviders(<CooperationDetails />, { preloadedState: mockState })
    })
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

  it('should render the component with tabs', async () => {
    const tab1 = await screen.findByText('cooperationsPage.tabs.activities')

    expect(tab1).toBeInTheDocument()

    const tab2 = await screen.findByText('cooperationsPage.tabs.details')

    fireEvent.click(tab2)

    await waitFor(() => {
      expect(tab2).toBeInTheDocument()
    })
  })

  it('should toggle notes block', async () => {
    const notes = await screen.findByRole('button', {
      name: 'cooperationsPage.details.notes'
    })

    fireEvent.click(notes)

    let cooperationNotes = await screen.findByText(/cooperation notes/i)
    await waitFor(() => {
      expect(cooperationNotes).toBeInTheDocument()
    })

    fireEvent.click(notes)

    await waitFor(() => {
      cooperationNotes = screen.queryByText(/cooperation notes/i)
      expect(cooperationNotes).not.toBeInTheDocument()
    })
  })
})
