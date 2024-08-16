import { screen, fireEvent, waitFor } from '@testing-library/react'

import { renderWithProviders, TestSnackbar } from '~tests/test-utils'

import useBreakpoints from '~/hooks/use-breakpoints'
import ProfileInfo from '~/containers/user-profile/profile-info/ProfileInfo'

vi.mock('~/hooks/use-breakpoints')

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useMatch: () => false,
  useNavigate: () => mockNavigate
}))

Object.assign(window.navigator, {
  clipboard: {
    writeText: vi.fn().mockImplementation(() => Promise.resolve())
  }
})

const mobileData = {
  isLaptopAndAbove: false,
  isMobile: true,
  isTablet: false
}

const laptopData = {
  isLaptopAndAbove: true,
  isMobile: false,
  isTablet: false
}

const userData = {
  _id: '64822a1433ebe4890079bb60',
  role: ['tutor'],
  firstName: 'Commander',
  lastName: 'Shepard',
  email: 'rubber883@gmail.com',
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
  photo: '../src/John_Shepard_29.jpeg',
  professionalSummary:
    'Some amount of text regarding the proficiency.Some amount of text rega',
  nativeLanguage: 'English',
  address: {
    city: 'Lviv',
    country: 'Ukraine'
  },
  averageRating: {
    student: 3,
    tutor: 2
  },
  totalReviews: {
    student: 1,
    tutor: 22
  },
  createdAt: '2023-06-12T18:26:22.625+00:00',
  updatedAt: '2023-07-12T19:33:43.616+00:00'
}

function renderWithBreakpoints(data) {
  useBreakpoints.mockImplementation(() => data)
  vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom')
    return {
      ...actual,
      useLocation: () => ({
        pathname: '/tutors/German/testUser'
      })
    }
  })
  renderWithProviders(
    <TestSnackbar>
      <ProfileInfo myRole={'student'} userData={userData} />
    </TestSnackbar>
  )
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('ProfileInfo test in my profile on laptop', () => {
  beforeEach(() => renderWithBreakpoints(laptopData))

  it('should copy link to profile', () => {
    const iconBtn = screen.getByTestId('icon-btn')

    fireEvent.click(iconBtn)

    expect(window.navigator.clipboard.writeText).toHaveBeenCalled()
  })

  it('should render send message button', () => {
    const sendMessageBtn = screen.getByText(
      /userProfilePage.profileInfo.sendMessage/i
    )

    expect(sendMessageBtn).toBeInTheDocument()
  })

  it('should click on `tutor offers` button', () => {
    const tutorOffersBtn = screen.getByText(
      /userProfilePage.profileInfo.tutorOffers/i
    )
    fireEvent.click(tutorOffersBtn)
    waitFor(() => {
      expect(mockNavigate).toHaveBeenCalled()
    })
  })
})

describe('ProfileInfo test in my profile on mobile', () => {
  beforeEach(() => renderWithBreakpoints(mobileData))

  it('should copy link to profile', () => {
    const iconBtn = screen.getByTestId('icon-btn')

    fireEvent.click(iconBtn)

    expect(window.navigator.clipboard.writeText).toHaveBeenCalled()
  })

  it('should render send message button', () => {
    const sendMessageBtn = screen.getByText(
      /userProfilePage.profileInfo.sendMessage/i
    )

    expect(sendMessageBtn).toBeInTheDocument()
  })
})
