import { renderWithProviders } from '~tests/test-utils'
import OfferBanner from '~/components/offer-banner/OfferBanner'
import { screen } from '@testing-library/react'
import useBreakpoints from '~/hooks/use-breakpoints'

vi.mock('~/hooks/use-breakpoints')

const buttonActions = [
  { label: 'Action 1', handleClick: vi.fn() },
  { label: 'Action 2', handleClick: vi.fn() }
]

const mockOffer = {
  _id: 'id',
  authorAvgRating: 4.3,
  description:
    'Hello. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which.',
  languages: ['Ukrainian', 'English'],
  author: {
    firstName: 'James',
    lastName: 'Wilson',
    totalReviews: {
      student: 0,
      tutor: 0
    },
    photo:
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    professionalSummary:
      'Senior lecturer at the Department of German Philology and Translation Department of English Philology Senior lecturer at the Department of German Philology and Translation Department of English Philology Senior lecturer at the Department of German Philology and Translation Department of English Philology'
  },
  price: 100,
  isBookmarked: false,
  category: {
    appearance: 'test'
  },
  subject: {
    id: '12345',
    name: 'English'
  },
  proficiencyLevel: ['Beginner', 'Advanced']
}

describe('OfferDetails on desktop', () => {
  const desktopData = { isDesktop: true, isMobile: false, isTablet: false }
  beforeEach(() => {
    useBreakpoints.mockImplementation(() => desktopData)
    renderWithProviders(
      <OfferBanner buttonActions={buttonActions} offer={mockOffer} />
    )
  })
  it('renders the bookmark button correctly', () => {
    expect(screen.getByTestId('iconButton')).toBeInTheDocument()
  })

  it('should display chips', () => {
    const chip = screen.getByText('English')
    expect(chip).toBeInTheDocument()
  })
})

describe('OfferDetails on desktop', () => {
  const tabletData = { isDesktop: false, isMobile: false, isTablet: true }
  beforeEach(() => {
    useBreakpoints.mockImplementation(() => tabletData)
    renderWithProviders(
      <OfferBanner buttonActions={buttonActions} offer={mockOffer} />
    )
  })

  it('should not display chips', () => {
    const chip = screen.queryByText('English')
    expect(chip).not.toBeInTheDocument()
  })
})
