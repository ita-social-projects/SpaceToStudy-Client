import { vi } from 'vitest'
import { fireEvent, waitFor, screen } from '@testing-library/react'
import { URLs } from '~/constants/request'
import OfferDetails from '~/pages/offer-details/OfferDetails'
import useBreakpoints from '~/hooks/use-breakpoints'
import { mockOffer } from '~tests/unit/pages/offer-details/OfferDetails.spec.constants'
import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'

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

const desktopData = {
  isLaptopAndAbove: true,
  isMobile: false,
  isTablet: false
}

const mockState = {
  appMain: { userId: mockOffer.author._id, userRole: 'tutor' }
}

describe('OfferDetails on desktop', () => {
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
    const {
      description,
      proficiencyLevel,
      price,
      author: { firstName, lastName }
    } = mockOffer
    const descriptionElement = await screen.findByText(description)
    const nameElement = screen.getByText(`${firstName} ${lastName[0]}.`)
    const proficiency = screen.getByText(proficiencyLevel[2])
    const priceElement = screen.getByText(price)

    expect(descriptionElement).toBeInTheDocument()
    expect(proficiency).toBeInTheDocument()
    expect(nameElement).toBeInTheDocument()
    expect(priceElement).toBeInTheDocument()
  })

  it('should change on active button', async () => {
    mockAxiosClient
      .onGet(`${URLs.offers.get}/${mockOffer._id}`)
      .reply(200, { ...mockOffer, status: 'draft' })

    const draft = screen.getByText('common.labels.moveToDraft')

    fireEvent.click(draft)

    const active = await screen.findByText('common.labels.makeActive')

    expect(active).toBeInTheDocument()
  })

  it('should change on draft button', async () => {
    const active = screen.getByText('common.labels.makeActive')

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
})

describe('Offer details with student role', () => {
  beforeEach(() => {
    useBreakpoints.mockImplementation(() => desktopData)

    renderWithProviders(<OfferDetails />, {
      preloadedState: {
        appMain: { userId: '6421d9833cdf38b706756dff', userRole: 'student' }
      }
    })

    mockAxiosClient
      .onGet(`${URLs.offers.get}/${mockOffer._id}`)
      .reply(200, mockOffer)
    mockAxiosClient
      .onGet(`${URLs.categories.get}${URLs.subjects.get}${URLs.offers.get}`)
      .reply(200, { offers: [], count: 0 })
  })

  it('should open modal window with enroll offer', async () => {
    const enrollOffer = await screen.findByText('common.labels.enrollOffer')

    fireEvent.click(enrollOffer)

    const modalTitle = screen.getByText('offerDetailsPage.enrollOffer.title')

    expect(modalTitle).toBeInTheDocument()
  })
})

describe('OfferDetails on mobile', () => {
  const mobileData = {
    isLaptopAndAbove: false,
    isMobile: true,
    isTablet: false
  }
  beforeEach(() => {
    useBreakpoints.mockImplementation(() => mobileData)
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
