import { screen, waitFor } from '@testing-library/react'
import UserProfile from '~/pages/user-profile/UserProfile.tsx'
import { renderWithProviders } from '~tests/test-utils'
import { URLs } from '../../../../src/constants/request'
import { mockAxiosClient } from '../../../test-utils'

const route = '/tutor/my-profile'

const mockTutorState = {
  appMain: { userRole: 'tutor', userId: '648850c4fdc2d1a130c24aea' }
}

const mockStudentState = {
  appMain: { userRole: 'student', userId: '648850c4fdc2d1a130c24aeb' }
}

const videoMockDataStudent = {
  videoLink: {
    student: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  }
}

const professionalBlockMock = {
  professionalBlock: {
    awards: 'My awards are countless, why bother telling you them?'
  }
}
const tutorMockData = {
  _id: '648850c4fdc2d1a130c24aea',
  role: ['tutor'],
  firstName: 'Іван',
  lastName: 'Мавдрик',
  email: 'ivan.mavdryk@example.com',
  mainSubjects: {
    student: [],
    tutor: [
      {
        _id: '648850c4fdc2d1a130c24aea',
        category: { _id: '64884f21fdc2d1a130c24ac0', name: 'Music' },
        subjects: [{ _id: '64885108fdc2d1a130c24af9', name: 'Guitar' }]
      },
      {
        _id: '648850c4fdc2d1342130c24d',
        category: { _id: '64884f21fdc2d1a130c24ac0', name: 'Cooking' },
        subjects: [{ _id: '64885108fdc2d1a130c24af9', name: 'Gastronomy' }]
      }
    ]
  },
  totalReviews: {
    student: 0,
    tutor: 0
  },
  averageRating: {
    student: 0,
    tutor: 0
  },
  nativeLanguage: 'Ukrainian',
  address: {
    country: 'Ukraine',
    city: 'Lviv',
    street: 'Shevchenka St.',
    postalCode: '79000'
  },
  photo: 'https://www.google.com',
  lastLogin: '2024-02-15T12:00:00Z',
  createdAt: '2023-06-12T10:00:00Z',
  updatedAt: '2024-02-15T12:30:00Z',
  videoLink: {
    tutor: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    student: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  status: {
    student: 'active',
    tutor: 'active'
  },
  notificationSettings: {
    emailNotifications: true,
    pushNotifications: false
  },
  bookmarkedOffers: ['64884f21fdc2d1a130c24ac0', '648850c4fdc2d1a130c24aea'],
  lastSeen: '2024-02-15T12:15:00Z'
}

const renderWithMockData = async ({
  mockData = tutorMockData,
  appMain = mockTutorState,
  extraData = {}
} = {}) => {
  await waitFor(() => {
    mockAxiosClient
      .onGet(
        `${URLs.users.get}/${appMain.appMain.userId}?userRole=${appMain.appMain.userRole}`
      )
      .reply(200, { ...mockData, ...extraData })
  })
  renderWithProviders(<UserProfile />, {
    preloadedState: appMain,
    initialEntries: route
  })
}

describe('UserProfile', () => {

  it('should render loader', async () => {
    renderWithMockData({ mockData: undefined })
    const loader = await screen.findByTestId('loader')

    expect(loader).toBeInTheDocument()
  })

  it('should find rendering name', async () => {
    renderWithMockData()
    const name = await screen.findByText(
      `${tutorMockData.firstName} ${tutorMockData.lastName}`
    )
    expect(name).toBeInTheDocument()
  })

  it('Should render video presentation block for tutor', async () => {
    renderWithMockData()

    const videoBlockTitle = await screen.findByText(
      'userProfilePage.videoPresentation.title'
    )
    expect(videoBlockTitle).toBeInTheDocument()
  })

  it('Should not render video presentation block when student has no video link', () => {
    renderWithMockData({ appMain: mockStudentState })

    const videoBlockTitle = screen.queryByText(
      'userProfilePage.videoPresentation.title'
    )
    expect(videoBlockTitle).not.toBeInTheDocument()
  })

  it('Should render video presentation block when student has a video link', async () => {
    await waitFor(() => {
      renderWithMockData({
        appMain: mockStudentState,
        extraData: videoMockDataStudent
      })
    })


    const videoBlockTitle = await screen.findByText(
      'userProfilePage.videoPresentation.title'
    )
    expect(videoBlockTitle).toBeInTheDocument()
  })

  it('Should render professional block info for tutor', async () => {
      await renderWithMockData({
        appMain: mockTutorState,
        extraData: professionalBlockMock
    })

    const aboutTutorTitle = await screen.findByText(
      'userProfilePage.tutorAbout.title'
    )

    expect(aboutTutorTitle).toBeInTheDocument()
  })

  it('Should not render professional block info for tutor if there is no information', () => {
    renderWithMockData({ appMain: mockTutorState })

    const aboutTutorTitle = screen.queryByText(
      'userProfilePage.tutorAbout.title'
    )
    expect(aboutTutorTitle).not.toBeInTheDocument()
  })
})
