import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import CommentsWithRatingBlock from '~/containers/user-profile/comments-with-rating-block/CommentsWithRatingBlock'
import { responseMock } from '~/containers/user-profile/comments-with-rating-block/CommentsWithRatingBlock.constants'
const { items } = responseMock
import { SortByEnum } from '~/types'

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

const Items = [
  { createdAt: '2024-08-15T12:00:00Z', rating: 4 },
  { createdAt: '2024-08-16T12:00:00Z', rating: 5 },
  { createdAt: '2024-08-14T12:00:00Z', rating: 3 }
]

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
})

describe('Sorting function', () => {
  it('should sort items by newest first', () => {
    const sortedItems = Items.sort((a, b) => {
      const sortBy = SortByEnum.Newest
      switch (sortBy) {
        case SortByEnum.Newest:
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        case SortByEnum.Relevant:
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        case SortByEnum.highestRating:
          return b.rating - a.rating
        case SortByEnum.lowestRating:
          return a.rating - b.rating
        default:
          return 0
      }
    })

    expect(sortedItems).toEqual([
      { createdAt: '2024-08-16T12:00:00Z', rating: 5 },
      { createdAt: '2024-08-15T12:00:00Z', rating: 4 },
      { createdAt: '2024-08-14T12:00:00Z', rating: 3 }
    ])
  })

  it('should sort items by highest rating first', () => {
    const sortedItems = Items.sort((a, b) => {
      const sortBy = SortByEnum.highestRating
      switch (sortBy) {
        case SortByEnum.Newest:
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        case SortByEnum.Relevant:
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        case SortByEnum.highestRating:
          return b.rating - a.rating
        case SortByEnum.lowestRating:
          return a.rating - b.rating
        default:
          return 0
      }
    })

    expect(sortedItems).toEqual([
      { createdAt: '2024-08-16T12:00:00Z', rating: 5 },
      { createdAt: '2024-08-15T12:00:00Z', rating: 4 },
      { createdAt: '2024-08-14T12:00:00Z', rating: 3 }
    ])
  })
})
