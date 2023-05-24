import { screen } from '@testing-library/react'
import AppRatingMobile from '~/components/app-rating-mobile/AppRatingMobile'
import { renderWithProviders } from '~tests/test-utils'

const mockState = {
  appMain: { userRole: 'tutor' }
}

describe('AppRatingMobile component', () => {
  it('should display a star icon', () => {
    const props = { value: 4.5, reviewsCount: 5 }
    renderWithProviders(<AppRatingMobile {...props} />, {
      preloadedState: mockState
    })

    const starIcon = screen.queryByTestId('star-icon')
    expect(starIcon).toBeInTheDocument()
  })
})
