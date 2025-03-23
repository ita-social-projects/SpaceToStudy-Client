import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import CommentsWithRatingBlock from '~/containers/user-profile/comments-with-rating-block/CommentsWithRatingBlock'
import { URLs } from '~/constants/request'

const currentUserId = '67d020fbcda203e190670036'
const currentUserRole = 'tutor'

const props = {
  averageRating: 4,
  userRole: currentUserRole,
  userId: currentUserId
}

const preloadedState = {
  socket: { usersOnline: [] }
}

const reviewsMock = {
  count: 1,
  reviews: [
    {
      _id: '67ddb7896a545740f4b36864',
      comment: 'review from student 1',
      rating: 4,
      author: {
        _id: '67d020accda203e19067001b',
        firstName: 'student',
        lastName: 'by',
        photo: ''
      },
      targetUserId: '67d020fbcda203e190670036',
      targetUserRole: 'tutor',
      offer: {
        _id: '67d021f4cda203e1906700c7',
        subject: {
          _id: '6675874d59019cd05eb11a16',
          name: 'Music Production'
        },
        category: {
          _id: '64884f4dfdc2d1a130c24ac6',
          name: 'Music'
        }
      },
      createdAt: '2025-03-21T19:01:29.864Z',
      updatedAt: '2025-03-21T19:01:29.864Z',
      proficiencyLevel: 'Test Preparation'
    }
  ]
}

describe('CommentsWithRatingBlock', () => {
  beforeEach(() => {
    mockAxiosClient.onGet(new RegExp(URLs.reviews.get)).reply(200, reviewsMock)

    renderWithProviders(<CommentsWithRatingBlock {...props} />, {
      preloadedState
    })
  })

  afterAll(() => {
    mockAxiosClient.reset()
  })

  it('should render the tutor comments block title', () => {
    const titleElement = screen.getByText('userProfilePage.reviews.titleTutor')
    expect(titleElement).toBeInTheDocument()
  })

  it('should increase amountToShow by commentsCount.increment when handleShowMoreComments is called', async () => {
    const showMoreButton = await screen.findByText(
      'userProfilePage.reviews.moreReviews'
    )

    expect(showMoreButton).toBeInTheDocument()

    fireEvent.click(showMoreButton)

    expect(showMoreButton).toBeInTheDocument()
  })

  it('should update filter state when handleFilterChange is called', async () => {
    const progressBar = await screen.findByTestId('progress-bar-4')
    fireEvent.click(progressBar)
    const resetButton = screen.getByTestId('reset-filter')

    expect(resetButton).toBeInTheDocument()
  })
})
