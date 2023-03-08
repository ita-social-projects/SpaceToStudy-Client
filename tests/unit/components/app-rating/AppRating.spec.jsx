import { render, screen } from '@testing-library/react'
import AppRating from '~/components/app-rating/AppRating'

describe('AppRating component', () => {
  it('only 1 star should be checked', () => {
    const props = { value: 1 }
    render(<AppRating { ...props } />)
    
    expect(screen.getAllByRole('radio')[0]).toBeChecked()
    expect(screen.getAllByRole('radio')[1]).not.toBeChecked()
  })

  it('displays big number when bigNumber prop is true', () => {
    const props = { bigNumber: true, reviews: 5, value: 4.5 }
    const { getByText, queryByTestId } = render(<AppRating  { ...props } />)

    const bigNumberBox = queryByTestId('big-number-box')
    expect(bigNumberBox).toBeInTheDocument()

    const ratingValue = getByText(props.rating.toString())
    expect(ratingValue).toBeInTheDocument()
  })

  it('displays star icon whe mobile is true', () => {
    const props = { bigNumber: true, mobile: true, value: 4.5 }
    render(<AppRating { ...props } />)
    const starIcom = screen.queryByTestId('star-icon')

    expect(starIcom).toBeInTheDocument()
  })

  it('should display the small number when smallNumber prop is true', () => {
    const props = { value: 3.5, smallNumber: true,withBackground: true }
    render(<AppRating { ...props } />)
    const smallNumberElement = screen.getByText(props.value.toString())

    expect(smallNumberElement).toBeInTheDocument()
  })

  it('should display the correct number of reviews', () => {
    const props = { value: 3.5, reviews: 5, mobile: true }
    render(<AppRating { ...props } />)
    const reviewsElement = screen.getByText('tutorProfilePage.reviews.reviewsCount')

    expect(reviewsElement).toBeInTheDocument()
  })
})
