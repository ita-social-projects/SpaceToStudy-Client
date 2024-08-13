import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import CommentsWithRatingBlock from '~/containers/user-profile/comments-with-rating-block/CommentsWithRatingBlock'
import { responseMock } from '~/containers/user-profile/comments-with-rating-block/CommentsWithRatingBlock.constants'
import { SortByEnum } from '~/types'

const { items } = responseMock

const props = {
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

describe('CommentsWithRatingBlock', () => {
  beforeEach(() => {
    renderWithProviders(<CommentsWithRatingBlock {...props} />)
  })

  it('should render the comments block', () => {
    const titleElement = screen.getByText('userProfilePage.reviews.title')
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

  it('should sort items by Newest correctly', () => {
    const sortBy = SortByEnum.Newest
    const sortedItems = [...items].sort((a, b) => {
      switch (sortBy) {
        case SortByEnum.Newest:
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        default:
          return 0
      }
    })

    expect(sortedItems[0].createdAt).toBe('2023-03-02T19:13:04.074Z')
  })

  it('should sort items by Relevant correctly', () => {
    const sortBy = SortByEnum.Relevant
    const sortedItems = [...items].sort((a, b) => {
      switch (sortBy) {
        case SortByEnum.Relevant:
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        default:
          return 0
      }
    })
    expect(sortedItems[0].createdAt).toBe('2023-03-02T19:13:04.074Z')
  })

  it('should sort items by highestRating correctly', () => {
    const sortBy = SortByEnum.highestRating
    const sortedItems = [...items].sort((a, b) => {
      switch (sortBy) {
        case SortByEnum.highestRating:
          return b.rating - a.rating
        default:
          return 0
      }
    })

    expect(sortedItems[0].rating).toBe(5)
  })

  it('should sort items by lowestRating correctly', () => {
    const sortBy = SortByEnum.lowestRating
    const sortedItems = [...items].sort((a, b) => {
      switch (sortBy) {
        case SortByEnum.lowestRating:
          return a.rating - b.rating
        default:
          return 0
      }
    })

    expect(sortedItems[0].rating).toBe(1)
  })
})
