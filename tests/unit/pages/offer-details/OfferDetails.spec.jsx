import { vi } from 'vitest'
import { fireEvent, waitFor, screen } from '@testing-library/react'
import { URLs } from '~/constants/request'
import OfferDetails from '~/pages/offer-details/OfferDetails'
import useBreakpoints from '~/hooks/use-breakpoints'
import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import { mockOffer } from '~tests/unit/pages/offer-details/OfferDetails.spec.constants'

vi.mock('~/hooks/use-breakpoints')
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useParams: () => ({
      id: mockOffer._id
    }),
    useOutletContext: () => ({
      data: mockOffer
    })
  }
})

const mockState = {
  appMain: { userId: mockOffer.author._id, userRole: 'tutor' }
}

describe('OfferDetails on desktop', () => {
  const desktopData = {
    isLaptopAndAbove: true,
    isMobile: false,
    isTablet: false
  }
  beforeEach(() => {
    useBreakpoints.mockImplementation(() => desktopData)

    renderWithProviders(<OfferDetails />, {
      preloadedState: mockState
    })

    mockAxiosClient
      .onGet(`${URLs.offers.get}/${mockOffer._id}`)
      .reply(200, mockOffer)
    mockAxiosClient
      .onGet(`${URLs.categories.get}${URLs.subjects.get}${URLs.offers.get}`)
      .reply(200, { offers: [], count: 0 })
  })

  it('should display the offer details correctly', async () => {
    const price = await screen.findByText(mockOffer.price)
    const authorAvgRating = screen.getByText(
      mockOffer.author.averageRating.tutor
    )
    const title = await screen.findByText(mockOffer.title)
    const name = await screen.findByText(
      `${mockOffer.author.firstName} ${mockOffer.author.lastName[0]}.`
    )

    expect(price).toBeInTheDocument()
    expect(authorAvgRating).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(name).toBeInTheDocument()
  })

  it('should change on active button', async () => {
    mockAxiosClient
      .onGet(`${URLs.offers.get}/${mockOffer._id}`)
      .reply(200, { ...mockOffer, status: 'draft' })

    const draft = await screen.findByText('common.labels.moveToDraft')

    fireEvent.click(draft)

    const active = await screen.findByText('common.labels.makeActive')

    expect(active).toBeInTheDocument()
  })

  it('should change on draft button', async () => {
    const active = await screen.findByText('common.labels.makeActive')

    fireEvent.click(active)

    const draft = await screen.findByText('common.labels.moveToDraft')

    expect(draft).toBeInTheDocument()
  })

  it('should open modal window with confirmation on close button', async () => {
    const closeOffer = screen.getByText('common.labels.closeOffer')

    fireEvent.click(closeOffer)

    const confirmationText = await screen.findByText(
      'offerDetailsPage.closeOffer'
    )

    expect(confirmationText).toBeInTheDocument()

    const yesButton = await screen.findByText('common.yes')

    fireEvent.click(yesButton)

    await waitFor(() => expect(confirmationText).not.toBeInTheDocument())
  })

  it('should open modal window with enroll offer', async () => {
    const newMockState = {
      appMain: { userId: '6421d9833cdf38b706756dff', userRole: 'student' }
    }

    renderWithProviders(<OfferDetails />, {
      preloadedState: newMockState
    })

    const enrollOffer = await screen.findByText('common.labels.enrollOffer')

    fireEvent.click(enrollOffer)

    const modalTitle = await screen.findByText(
      'offerDetailsPage.enrollOffer.title'
    )

    expect(modalTitle).toBeInTheDocument()
  })
})

describe('OfferDetails on mobile', () => {
  const desktopData = {
    isLaptopAndAbove: false,
    isMobile: true,
    isTablet: false
  }
  beforeEach(() => {
    useBreakpoints.mockImplementation(() => desktopData)

    renderWithProviders(<OfferDetails />, {
      preloadedState: mockState
    })
  })

  it('should display the offer details correctly', async () => {
    const authorAvgRating = screen.getByText(
      mockOffer.author.averageRating.tutor
    )
    const title = await screen.findByText(mockOffer.title)
    const name = await screen.findByText(
      `${mockOffer.author.firstName} ${mockOffer.author.lastName}`
    )

    expect(authorAvgRating).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(name).toBeInTheDocument()
  })
})

describe('Should show Loader', () => {
  it('should render Loader - (loading from useAxios)', async () => {
    mockAxiosClient
      .onGet(`${URLs.offers.get}/${mockOffer._id}`)
      .reply(200, null)
    mockAxiosClient
      .onGet(`${URLs.categories.get}${URLs.subjects.get}${URLs.offers.get}`)
      .reply(200, { offers: [], count: 0 })
    const newMockState = {
      appMain: {
        userId: mockOffer.author._id,
        userRole: 'tutor',
        loading: true
      }
    }
    renderWithProviders(<OfferDetails />, {
      preloadedState: newMockState
    })

    const loader = screen.getByTestId('loader')

    expect(loader).toBeInTheDocument()
  })
})
