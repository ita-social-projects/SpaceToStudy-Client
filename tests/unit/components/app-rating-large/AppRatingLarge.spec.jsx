import { render, screen } from '@testing-library/react'
import AppRatingLarge from '~/components/app-rating-large/AppRatingLarge'

describe('AppRatingLarge component', () => {
  it('should display a star icon when mobile prop is true', () => {
    const props = { value: 4.5, reviewsCount: 5, mobile: true }
    render(<AppRatingLarge { ...props } />)

    const starIcon = screen.queryByTestId('star-icon')
    expect(starIcon).toBeInTheDocument()
  })

  it('should not display AppRating component when mobile prop is true', () => {
    const props = { value: 4.5, reviewsCount: 5, mobile: true }
    render(<AppRatingLarge { ...props } />)

    const appRating = screen.queryByTestId('app-rating')
    expect(appRating).not.toBeInTheDocument()
  })

  it('should display AppRating component when mobile prop is false', () => {
    const props = { value: 4.5, reviewsCount: 5, mobile: false }
    render(<AppRatingLarge { ...props } />)

    const appRating = screen.queryByTestId('app-rating')
    expect(appRating).toBeInTheDocument()
  })
})
