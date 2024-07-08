import { vi } from 'vitest'
import { screen } from '@testing-library/react'
import OfferContainer from '~/containers/find-offer/offer-container/OfferContainer'
import useBreakpoints from '~/hooks/use-breakpoints'
import { renderWithProviders } from '~tests/test-utils'
import { mockOffer } from '~tests/unit/pages/offer-details/OfferDetails.spec.constants'

vi.mock('~/hooks/use-breakpoints')

const cardsViewEnums = {
  grid: 'grid',
  inline: 'inline'
}

describe('OfferContainer test on mobile', () => {
  const mobileData = {
    isLaptopAndAbove: false,
    isMobile: true,
    isTablet: false
  }

  it('Test should render square card component on mobile', () => {
    useBreakpoints.mockImplementation(() => mobileData)
    renderWithProviders(
      <OfferContainer
        offerCards={[mockOffer]}
        viewMode={cardsViewEnums.inline}
      />
    )
    const starIcon = screen.getAllByTestId('star-icon')

    expect(starIcon).toHaveLength(1)
  })
})

describe('OfferContainer test on tablet', () => {
  const mobileData = {
    isLaptopAndAbove: false,
    isMobile: false,
    isTablet: true
  }

  it('Test should render rectangular card on tablet', () => {
    useBreakpoints.mockImplementation(() => mobileData)
    renderWithProviders(
      <OfferContainer offerCards={[mockOffer]} viewMode={cardsViewEnums.grid} />
    )
    const ratingIcon = screen.getAllByTestId('app-rating')

    expect(ratingIcon).toHaveLength(1)
  })
})

describe('OfferContainer test on desktop', () => {
  const mobileData = {
    isLaptopAndAbove: true,
    isMobile: false,
    isTablet: false
  }

  it('Test should render rectangular card on desktop with grid viewMode', () => {
    useBreakpoints.mockImplementation(() => mobileData)
    renderWithProviders(
      <OfferContainer offerCards={[mockOffer]} viewMode={cardsViewEnums.grid} />
    )

    const starIcon = screen.getAllByTestId('star-icon')

    expect(starIcon).toHaveLength(1)
  })

  it('Test should render rectangular card on desktop with inline viewMode', () => {
    useBreakpoints.mockImplementation(() => mobileData)
    renderWithProviders(
      <OfferContainer
        offerCards={[mockOffer]}
        viewMode={cardsViewEnums.inline}
      />
    )

    const ratingIcon = screen.getAllByTestId('app-rating')

    expect(ratingIcon).toHaveLength(1)
  })
})
