import { fireEvent, render, screen } from '@testing-library/react'
import ComentsBlock from '~/containers/tutor-profile/coments-block/ComentsBlock'

const props = {
  userId: '123',
  userRole: 'tutor',
  averageRating: 4.5,
  totalReviews: 5,
  reviewsCount: [
    { count: 1, rating: 1 },
    { count: 1, rating: 3 },
    { count: 3, rating: 5 },
    { count: 2, rating: 4 }
  ]
}

describe('ComentsBlock', () => {
  beforeEach(()=>{
    render(<ComentsBlock { ...props } />)
  })
  it('should render the comments block', () => {
    const titleElement = screen.getByText('tutorProfilePage.reviews.title')

    expect(titleElement).toBeInTheDocument()
  })
  it('should increase amountToShow by commentsCount.increment when handleShowMoreComments is called', () => {
    const showMoreButton = screen.getByRole('button')

    expect(showMoreButton).toBeInTheDocument()

    fireEvent.click(showMoreButton)

    expect(showMoreButton).not.toBeInTheDocument()
  })
  it('should update filter state when handleFilterChange is called',  () => {
    const progressBar =  screen.getByTestId('progress-bar-1')
    fireEvent.click(progressBar)
    const resetButton =  screen.getByTestId('reset-filter')

    expect(resetButton).toBeInTheDocument()
  })
  
})
