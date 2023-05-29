import { vi } from 'vitest'
import { screen } from '@testing-library/react'
import { URLs } from '~/constants/request'
import OfferDetails from '~/pages/offer-details/OfferDetails'
import useBreakpoints from '~/hooks/use-breakpoints'
import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'

vi.mock('~/hooks/use-breakpoints')
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useOutletContext: () => ({
      data: mockData
    })
  }
})
const mockData = {
  id: '64480bb14ee3d89a58631730',
  authorAvgRating: 4.3,
  authorFirstName: 'James',
  authorLastName: 'Wilson',
  title: 'Hello',
  description:
    'Hello. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which.',
  languages: ['Ukrainian', 'English'],
  author: {
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
  subject: {
    id: '12345',
    name: 'English'
  },
  proficiencyLevel: ['Beginner', 'Advanced']
}

const mockState = {
  appMain: { userRole: 'tutor' }
}

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useParams: () => ({
      id: mockData.id
    })
  }
})

mockAxiosClient.onGet(`${URLs.offers.get}/${mockData.id}`).reply(200, mockData)
mockAxiosClient
  .onGet(`${URLs.categories.get}${URLs.subjects.get}${URLs.offers.get}`)
  .reply(200, { offers: [], count: 0 })

describe('OfferDetails on desktop', () => {
  const desktopData = { isDesktop: true, isMobile: false, isTablet: false }
  beforeEach(() => {
    useBreakpoints.mockImplementation(() => desktopData)

    renderWithProviders(<OfferDetails />, {
      preloadedState: mockState
    })
  })

  it('should display the offer details correctly', async () => {
    const price = await screen.findByText(mockData.price)
    const authorAvgRating = await screen.findByText(mockData.authorAvgRating)
    const title = await screen.findByText(mockData.title)
    const name = await screen.findByText(
      `${mockData.authorFirstName} ${mockData.authorLastName[0]}.`
    )
    const subject = await screen.findByText(mockData.subject.name.toUpperCase())

    expect(price).toBeInTheDocument()
    expect(authorAvgRating).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(name).toBeInTheDocument()
    expect(subject).toBeInTheDocument()
  })
})

describe('OfferDetails on mobile', () => {
  const desktopData = { isDesktop: false, isMobile: true, isTablet: false }
  beforeEach(() => {
    useBreakpoints.mockImplementation(() => desktopData)

    renderWithProviders(<OfferDetails />, {
      preloadedState: mockState
    })
  })

  it('should display the offer details correctly', async () => {
    const authorAvgRating = await screen.findByText(mockData.authorAvgRating)
    const title = await screen.findByText(mockData.title)
    const name = await screen.findByText(
      `${mockData.authorFirstName} ${mockData.authorLastName}`
    )

    expect(authorAvgRating).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(name).toBeInTheDocument()
  })
})
