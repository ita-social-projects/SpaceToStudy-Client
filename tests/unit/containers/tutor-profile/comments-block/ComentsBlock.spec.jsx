import { render, fireEvent, screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import { MemoryRouter } from 'react-router-dom'
import CommentsWithRatingBlock from '~/containers/user-profile/comments-with-rating-block/CommentsWithRatingBlock'
import { UserRoleEnum } from '~/types'

const props = {
  averageRating: 4.5,
  totalReviews: 5,
  reviewsCount: [
    { count: 1, rating: 1 },
    { count: 1, rating: 3 },
    { count: 3, rating: 5 },
    { count: 2, rating: 4 }
  ]
}

const mockReviewsCount = [
  { count: 10, rating: 5 },
  { count: 4, rating: 4 },
  { count: 2, rating: 3 },
  { count: 1, rating: 2 },
  { count: 0, rating: 1 }
]

describe('CommentsWithRatingBlock', () => {
  beforeEach(() => {
    renderWithProviders(<CommentsWithRatingBlock {...props} />)
  })
  it('should render the tutor comments block title', () => {
    render(
      <MemoryRouter>
        <CommentsWithRatingBlock
          averageRating={4.5}
          reviewsCount={mockReviewsCount}
          totalReviews={20}
          userRole={UserRoleEnum.Tutor}
        />
      </MemoryRouter>
    )
    const titleElement = screen.getByText('userProfilePage.reviews.titleTutor')
    expect(titleElement).toBeInTheDocument()
  })
  it('should increase amountToShow by commentsCount.increment when handleShowMoreComments is called', () => {
    const showMoreButton = screen.getByRole('button')

    expect(showMoreButton).toBeInTheDocument()

    fireEvent.click(showMoreButton)

    expect(showMoreButton).toBeInTheDocument()
  })
  it('should update filter state when handleFilterChange is called', () => {
    const progressBar = screen.getByTestId('progress-bar-1')
    fireEvent.click(progressBar)
    const resetButton = screen.getByTestId('reset-filter')

    expect(resetButton).toBeInTheDocument()
  })
})
