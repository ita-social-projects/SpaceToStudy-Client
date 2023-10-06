import { screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'

import { SnackBarProvider } from '~/context/snackbar-context'
import { renderWithProviders } from '~tests/test-utils'

import useBreakpoints from '~/hooks/use-breakpoints'
import ProfileInfo from '~/containers/tutor-profile/profile-info/ProfileInfo'

vi.mock('~/hooks/use-breakpoints')

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
        _id: '645b9f4a1c0272f5cde0e11e',
        name: 'Danish',
        category: '6459347d943e375d1c0a1912',
        totalOffers: 0
      },
      {
        _id: '6422d995d898aa732d038e8f',
        name: 'Guitar',
        category: '6421ed8ed991d46a84721dfa',
        totalOffers: 4
      },
      {
        _id: '6422ad6a74c1353b96c7c132',
        name: 'Web design',
        category: '6421ed8ed991d46a84721df4',
        totalOffers: 9
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
    <SnackBarProvider>
      <ProfileInfo userData={userData} />
    </SnackBarProvider>
  )
}

describe('ProfileInfo test in my profile on laptop', () => {
  beforeEach(() => renderWithBreakpoints(laptopData))

  it('should copy link to profile', () => {
    const iconBtn = screen.getByTestId('icon-btn')

    fireEvent.click(iconBtn)

    expect(window.navigator.clipboard.writeText).toHaveBeenCalled()
  })

  it('should render send message button', () => {
    const sendMessageBtn = screen.getByText(
      /tutorProfilePage.profileInfo.sendMessage/i
    )

    expect(sendMessageBtn).toBeInTheDocument()
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
      /tutorProfilePage.profileInfo.sendMessage/i
    )

    expect(sendMessageBtn).toBeInTheDocument()
  })
})
