import { vi } from 'vitest'
import MockAdapter from 'axios-mock-adapter'
import { screen } from '@testing-library/react'
import { ModalProvider } from '~/context/modal-context'
import { OfferService } from '~/services/offer-service'
import { axiosClient } from '~/plugins/axiosClient'
import { URLs } from '~/constants/request'
import OfferDetails from '~/pages/offer-details/OfferDetails'
import useBreakpoints from '~/hooks/use-breakpoints'
import { renderWithProviders } from '~tests/test-utils'

const mockAxiosClient = new MockAdapter(axiosClient)

vi.mock('~/services/offer-service')
vi.mock('~/hooks/use-breakpoints')

const mockData = {
  id: '64480bb14ee3d89a58631730',
  authorAvgRating: 4.3,
  authorFirstName: 'James',
  authorLastName: 'Wilson',
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

OfferService.getOffer.mockResolvedValue({
  data: mockData
})

const mockState = {
  appMain: { userRole: 'tutor' }
}

const route = `/offers/${mockData.id}`

describe('OfferDetails on desktop', () => {
  const desktopData = { isDesktop: true, isMobile: false, isTablet: false }
  beforeEach(() => {
    useBreakpoints.mockImplementation(() => desktopData)
    mockAxiosClient
      .onGet(`${URLs.offers.get}/${mockData.id}`)
      .reply(200, mockData)

    renderWithProviders(
      <ModalProvider>
        <OfferDetails />
      </ModalProvider>,
      { initialEntries: route, preloadedState: mockState }
    )
  })

  it('should display the offer details correctly', () => {
    expect(screen.getByText(mockData.price)).toBeInTheDocument()
    expect(screen.getByText(mockData.authorAvgRating)).toBeInTheDocument()
    expect(
      screen.getByText(mockData.author.professionalSummary)
    ).toBeInTheDocument()
    expect(
      screen.getByText(`${mockData.authorFirstName} ${mockData.authorLastName}`)
    ).toBeInTheDocument()
    expect(
      screen.getByText(mockData.subject.name.toUpperCase())
    ).toBeInTheDocument()
  })
})

describe('OfferDetails on mobile', () => {
  const desktopData = { isDesktop: false, isMobile: true, isTablet: false }
  beforeEach(() => {
    useBreakpoints.mockImplementation(() => desktopData)
    mockAxiosClient
      .onGet(`${URLs.offers.get}/${mockData.id}`)
      .reply(200, mockData)

    renderWithProviders(
      <ModalProvider>
        <OfferDetails />
      </ModalProvider>,
      { initialEntries: route, preloadedState: mockState }
    )
  })

  it('should display the offer details correctly', () => {
    expect(screen.getByText(mockData.authorAvgRating)).toBeInTheDocument()
    expect(
      screen.getByText(mockData.author.professionalSummary)
    ).toBeInTheDocument()
    expect(
      screen.getByText(`${mockData.authorFirstName} ${mockData.authorLastName}`)
    ).toBeInTheDocument()
  })
})
