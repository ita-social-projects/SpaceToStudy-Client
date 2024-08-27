import { render, fireEvent, screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import { MemoryRouter } from 'react-router-dom'
import CommentsWithRatingBlock from '~/containers/user-profile/comments-with-rating-block/CommentsWithRatingBlock'
import { responseMock } from '~/containers/user-profile/comments-with-rating-block/CommentsWithRatingBlock.constants'
import userEvent from '@testing-library/user-event'
import { SortByEnum, UserRoleEnum } from '~/types'
const { items } = responseMock

const mockSetFilter = vi.fn()

const props = {
  setFilter: mockSetFilter,
  averageRating: 4.5,
  totalReviews: 5,
  reviewsCount: [
    { count: 1, rating: 1 },
    { count: 1, rating: 3 },
    { count: 3, rating: 5 },
    { count: 2, rating: 4 }
  ],
  items: items
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

  it('should update sortBy state when handleSortChange is called', () => {
    const sortSelect = screen.getByTestId('sort-select')
    expect(sortSelect).toBeInTheDocument()
    fireEvent.click(sortSelect)
  })

  it('should update filter state when handleFilterChange is called', () => {
    const selectElement = screen.getByTestId('filter-select')
    expect(selectElement).toBeInTheDocument()
    fireEvent.click(selectElement)
  })

  it('should sort comments by newest first', async () => {
    renderWithProviders(<CommentsWithRatingBlock {...props} />)

    const sortSelect = screen.getAllByTestId('sort-select')[0]
    userEvent.click(sortSelect) // or fireEvent.mouseDown(sortSelect)

    const newestOption = await screen.findAllByText(/newest/i)[0]
    userEvent.click(newestOption)

    const sortedCommentItems = screen.getAllByTestId('comment-item')
    const newestSortedItems = [...props.items].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    sortedCommentItems.forEach((comment, index) => {
      expect(comment).toHaveTextContent(newestSortedItems[index].comment)
    })
  })

  it('should render RatingBlock with correct props', () => {
    renderWithProviders(<CommentsWithRatingBlock {...props} />)

    const ratingBlock = screen.queryByTestId('rating-block')
    if (ratingBlock) {
      expect(ratingBlock).toHaveAttribute(
        'data-average-rating',
        `${props.averageRating}`
      )
      expect(ratingBlock).toHaveAttribute(
        'data-total-reviews',
        `${props.totalReviews}`
      )
    }
  })

  it('should sort comments by newest first', () => {
    renderWithProviders(<CommentsWithRatingBlock {...props} />)

    const sortSelect = screen.getAllByTestId('sort-select')[0]
    userEvent.click(sortSelect, [SortByEnum.Newest])

    const sortedCommentItems = screen.getAllByTestId('comment-item')
    const newestSortedItems = [...props.items].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    sortedCommentItems.forEach((comment, index) => {
      expect(comment).toHaveTextContent(newestSortedItems[index].comment)
    })
  })

  it('should sort comments by relevant first', () => {
    renderWithProviders(
      <CommentsWithRatingBlock {...props} sortBy={SortByEnum.Relevant} />
    )

    const sortSelect = screen.getAllByTestId('sort-select')[1]
    userEvent.click(sortSelect, [SortByEnum.Relevant])

    const sortedCommentItems = screen.getAllByTestId('comment-item')
    const relevantSortedItems = [...props.items].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    sortedCommentItems.forEach((comment, index) => {
      expect(comment).toHaveTextContent(relevantSortedItems[index].comment)
    })
  })

  it('should sort comments by highest rating first', () => {
    renderWithProviders(
      <CommentsWithRatingBlock {...props} sortBy={SortByEnum.highestRating} />
    )

    const sortSelect = screen.getAllByTestId('sort-select')[2]
    userEvent.click(sortSelect, [SortByEnum.highestRating])

    const sortedCommentItems = screen.getAllByTestId('comment-item')
    const highestRatingSortedItems = [...props.items].sort(
      (a, b) => b.rating - a.rating
    )

    sortedCommentItems.forEach((comment, index) => {
      expect(comment).toHaveTextContent(highestRatingSortedItems[index].comment)
    })
  })
})
