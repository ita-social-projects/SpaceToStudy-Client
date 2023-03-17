import { render, screen } from '@testing-library/react'
import AppRatingMobile from '~/components/app-rating-mobile/AppRatingMobile'

describe('AppRatingMobile component', () => {
  it('should display a star icon', () => {
    const props = { value: 4.5, reviewsCount: 5 }
    render(<AppRatingMobile { ...props } />)

    const starIcon = screen.queryByTestId('star-icon')
    expect(starIcon).toBeInTheDocument()
  })
})
