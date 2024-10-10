import { renderWithProviders } from '~tests/test-utils'
import OfferBanner from '~/components/offer-banner/OfferBanner'
import { screen } from '@testing-library/react'
import useBreakpoints from '~/hooks/use-breakpoints'
import { mockOffer } from '~tests/unit/pages/offer-details/OfferDetails.spec.constants'

vi.mock('~/hooks/use-breakpoints')

const buttonActions = [
  { label: 'Action 1', handleClick: vi.fn() },
  { label: 'Action 2', handleClick: vi.fn() }
]

const preloadedState = {
  socket: { usersOnline: [] }
}

describe('OfferDetails on desktop', () => {
  const desktopData = {
    isLaptopAndAbove: true,
    isMobile: false,
    isTablet: false
  }
  beforeEach(() => {
    useBreakpoints.mockImplementation(() => desktopData)
    renderWithProviders(
      <OfferBanner buttonActions={buttonActions} offer={mockOffer} />,
      { preloadedState }
    )
  })
  it('renders the bookmark button correctly', () => {
    expect(screen.getByTestId('iconButton')).toBeInTheDocument()
  })

  it('should display chips', () => {
    const chip = screen.getByText(mockOffer.subject.name)
    expect(chip).toBeInTheDocument()
  })
})

describe('OfferDetails on desktop', () => {
  const tabletData = {
    isLaptopAndAbove: false,
    isMobile: false,
    isTablet: true
  }
  beforeEach(() => {
    useBreakpoints.mockImplementation(() => tabletData)
    renderWithProviders(
      <OfferBanner buttonActions={buttonActions} offer={mockOffer} />,
      { preloadedState }
    )
  })

  it('should not display chips', () => {
    const chip = screen.queryByText(mockOffer.subject.name)
    expect(chip).not.toBeInTheDocument()
  })
})
