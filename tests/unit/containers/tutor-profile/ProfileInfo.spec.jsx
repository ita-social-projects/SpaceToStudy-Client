import { screen, fireEvent, act } from '@testing-library/react'
import { renderWithProviders, TestSnackbar } from '~tests/test-utils'

import { useMatch } from 'react-router-dom'
import useBreakpoints from '~/hooks/use-breakpoints'
import ProfileInfo from '~/containers/user-profile/profile-info/ProfileInfo'
import useAxios from '~/hooks/use-axios'
import { vi } from 'vitest'

const mockNavigate = vi.fn()

vi.mock('~/hooks/use-breakpoints')

const mockSetChatInfo = vi.fn()
const mockFetchData = vi.fn()

vi.mock('~/context/chat-context', () => ({
  useChatContext: () => ({
    setChatInfo: mockSetChatInfo
  })
}))

vi.mock('~/hooks/use-axios', () => ({
  default: vi.fn(() => ({
    response: [],
    loading: false,
    fetchData: vi.fn()
  }))
}))

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useMatch: vi.fn(),
    useNavigate: () => mockNavigate
  }
})

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

function renderWithBreakpoints(data, role = 'student') {
  useBreakpoints.mockImplementation(() => data)
  renderWithProviders(
    <TestSnackbar>
      <ProfileInfo myRole={role} userData={userData} />
    </TestSnackbar>
  )
}

describe('ProfileInfo component tests', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  describe('when profile is not own and on laptop', () => {
    beforeEach(() => {
      useMatch.mockImplementation(() => false)
      renderWithBreakpoints(laptopData, 'student')
    })

    it('should copy link to profile', async () => {
      const iconBtn = screen.getByTestId('icon-btn')
      await act(() => fireEvent.click(iconBtn))

      expect(window.navigator.clipboard.writeText).toHaveBeenCalled()
    })

    it('should render send message button', () => {
      const sendMessageBtn = screen.getByText(
        /userProfilePage.profileInfo.sendMessage/i
      )

      expect(sendMessageBtn).toBeInTheDocument()
    })

    it('should navigate on clicking "tutor offers" button', () => {
      const tutorOffersBtn = screen.getByText(
        /userProfilePage.profileInfo.tutorOffers/i
      )
      fireEvent.click(tutorOffersBtn)

      expect(mockNavigate).toHaveBeenCalled()
    })
  })

  describe('when profile is not own and on mobile', () => {
    beforeEach(() => {
      useMatch.mockImplementation(() => false)
      renderWithBreakpoints(mobileData, 'tutor')
    })

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

  describe('test with different cases of useMatch', () => {
    it('should render EditOutlinedIcon for own profile [ isMyProfile = true ]', () => {
      useMatch.mockImplementation(() => true)
      renderWithBreakpoints(mobileData, 'tutor')

      const editIcon = screen.getByTestId('icon-btn').querySelector('svg')

      expect(editIcon).toBeInTheDocument()
      expect(editIcon.getAttribute('data-testid')).toBe('EditOutlinedIcon')
    })

    it('should render CopyRoundedIcon for not own profile [ isMyProfile = false ]', () => {
      useMatch.mockImplementation(() => false)
      renderWithBreakpoints(mobileData, 'tutor')

      const copyIcon = screen.getByTestId('icon-btn').querySelector('svg')

      expect(copyIcon).toBeInTheDocument()
      expect(copyIcon.getAttribute('data-testid')).toBe(
        'ContentCopyRoundedIcon'
      )
    })
  })
})

const chatResponse = [
  {
    _id: 'chat456',
    members: [
      { user: { _id: '64822a1433ebe4890079bb60' } },
      { user: { _id: 'otherUser' } }
    ]
  }
]

describe('onSendMessageClick tests', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should set chat info for an existing chat', () => {
    useAxios.mockImplementation(() => ({
      default: vi.fn(),
      response: chatResponse,
      loading: false,
      fetchData: mockFetchData
    }))

    useMatch.mockImplementation(() => false)
    renderWithBreakpoints(laptopData, 'student')

    const sendMessageBtn = screen.getByText(
      /userProfilePage.profileInfo.sendMessage/i
    )
    fireEvent.click(sendMessageBtn)

    expect(mockSetChatInfo).toHaveBeenCalledWith({
      author: userData,
      authorRole: 'tutor',
      chatId: 'chat456',
      updateInfo: expect.any(Function)
    })

    expect(mockFetchData).not.toHaveBeenCalled()
  })

  it('should trigger fetchData when no existing chat is found', () => {
    useAxios.mockImplementation(() => ({
      default: vi.fn(),
      response: [],
      loading: false,
      fetchData: mockFetchData
    }))

    useMatch.mockImplementation(() => false)
    renderWithBreakpoints(laptopData, 'student')

    const sendMessageBtn = screen.getByText(
      /userProfilePage.profileInfo.sendMessage/i
    )
    fireEvent.click(sendMessageBtn)

    expect(mockSetChatInfo).toHaveBeenCalledWith({
      author: userData,
      authorRole: 'tutor',
      chatId: '',
      updateInfo: expect.any(Function)
    })

    expect(mockFetchData).toHaveBeenCalled()
  })
})
