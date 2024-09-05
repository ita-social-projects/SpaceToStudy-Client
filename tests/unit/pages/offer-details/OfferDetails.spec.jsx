import { expect, vi } from 'vitest'
import { fireEvent, waitFor, screen } from '@testing-library/react'
import { URLs } from '~/constants/request'
import OfferDetails from '~/pages/offer-details/OfferDetails'
import useBreakpoints from '~/hooks/use-breakpoints'
import { mockOffer } from '~tests/unit/pages/offer-details/OfferDetails.spec.constants'
import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import { setField } from '~/redux/features/editProfileSlice'
import { openAlert } from '~/redux/features/snackbarSlice'
import { getErrorKey } from '~/utils/get-error-key'
import { StatusEnum } from '~/types'

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

vi.mock('~/redux/features/editProfileSlice', async () => {
  const actual = await vi.importActual('~/redux/features/editProfileSlice')
  return {
    ...actual,
    setField: vi.fn()
  }
})
vi.mock('~/redux/features/snackbarSlice', async () => {
  const actual = await vi.importActual('~/redux/features/snackbarSlice')
  return {
    ...actual,
    openAlert: vi.fn()
  }
})

vi.mock('~/utils/get-error-key', () => ({
  getErrorKey: vi.fn(() => 'error-message')
}))

const dispatch = vi.fn()

const desktopData = {
  isLaptopAndAbove: true,
  isMobile: false,
  isTablet: false
}

const mockState = {
  appMain: { userId: mockOffer.author._id, userRole: 'tutor' }
}

describe('OfferDetails on desktop', () => {
  beforeEach(async () => {
    await waitFor(() => {
      useBreakpoints.mockImplementation(() => desktopData)

      renderWithProviders(<OfferDetails />, {
        preloadedState: mockState
      })

      mockAxiosClient
        .onGet(`${URLs.offers.get}/${mockOffer._id}`)
        .reply(200, mockOffer)
      mockAxiosClient
        .onPatch(`${URLs.offers.update}/${mockOffer._id}`)
        .reply(200, null)
      mockAxiosClient
        .onGet(`${URLs.categories.get}${URLs.subjects.get}${URLs.offers.get}`)
        .reply(200, { offers: [], count: 0 })
    })
  })

  it('should display the offer details correctly', async () => {
    const {
      description,
      proficiencyLevel,
      author: { firstName, lastName }
    } = mockOffer
    const descriptionElement = await screen.findByText(description)
    const nameElement = screen.getByText(`${firstName} ${lastName[0]}.`)
    const proficiency = screen.getByText(proficiencyLevel[2])

    expect(descriptionElement).toBeInTheDocument()
    expect(proficiency).toBeInTheDocument()
    expect(nameElement).toBeInTheDocument()
  })

  it('should change toggle button to active/draft', async () => {
    mockAxiosClient
      .onGet(`${URLs.offers.get}/${mockOffer._id}`)
      .reply(200, { ...mockOffer, status: 'draft' })

    const draft = await screen.findByText('common.labels.moveToDraft')

    waitFor(() => {
      fireEvent.click(draft)
    })
    const active = await screen.findByText('common.labels.makeActive')

    expect(active).toBeInTheDocument()
  })

  it('should open modal window on close offer', async () => {
    const closeOffer = screen.getByText('common.labels.closeOffer')

    waitFor(() => {
      fireEvent.click(closeOffer)
    })

    const confirmationText = await screen.findByText(
      'offerDetailsPage.closeOffer'
    )

    expect(confirmationText).toBeInTheDocument()

    const yesButton = await screen.findByText('common.yes')

    waitFor(() => {
      fireEvent.click(yesButton)
    })

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
      .onPatch(`${URLs.offers.update}/${mockOffer._id}`)
      .reply(200, null)
    mockAxiosClient
      .onGet(`${URLs.categories.get}${URLs.subjects.get}${URLs.offers.get}`)
      .reply(200, { offers: [], count: 0 })
  })

  it('should open modal window with enroll offer', async () => {
    const enrollOffer = await screen.findByText('common.labels.enrollOffer')

    waitFor(() => {
      fireEvent.click(enrollOffer)
    })

    const modalTitle = screen.getByText('offerDetailsPage.enrollOffer.title')

    expect(modalTitle).toBeInTheDocument()
  })

  it('should dispatch setField with the correct payload in handleResponse', () => {
    const handleResponse = (response) => {
      dispatch(setField({ field: 'bookmarkedOffers', value: response }))
    }

    const response = ['offer1', 'offer2']

    handleResponse(response)

    expect(setField).toHaveBeenCalledWith({
      field: 'bookmarkedOffers',
      value: response
    })
  })

  it('should dispatch openAlert with an error message in handleResponseError', () => {
    const handleResponseError = (error) => {
      dispatch(
        openAlert({
          severity: 'error',
          message: getErrorKey(error)
        })
      )
    }

    const error = { code: 400, message: 'Invalid request' }

    handleResponseError(error)

    expect(getErrorKey).toHaveBeenCalledWith(error)
    expect(dispatch).toHaveBeenCalledWith(
      openAlert({
        severity: 'error',
        message: 'error-message'
      })
    )
  })

  it('should call toggleBookmark inside onBookmarkClick()', () => {
    const toggleBookmark = vi.fn()

    const onBookmarkClick = (id) => {
      void toggleBookmark(id)
    }

    const id = 'offerId'

    onBookmarkClick(id)

    expect(toggleBookmark).toHaveBeenCalledWith(id)
  })

  it('should toggle offer status in handleToggleOfferStatus', async () => {
    const offerData = {
      status: StatusEnum.Draft
    }

    const fetchDataUpdateOffer = vi.fn()
    const fetchDataOffer = vi.fn()

    const handleToggleOfferStatus = async () => {
      const status =
        offerData?.status === StatusEnum.Draft
          ? StatusEnum.Active
          : StatusEnum.Draft

      await fetchDataUpdateOffer({ status })
      void fetchDataOffer()
    }

    await handleToggleOfferStatus()

    expect(fetchDataUpdateOffer).toHaveBeenCalledWith({
      status: StatusEnum.Active
    })
    expect(fetchDataOffer).toHaveBeenCalled()
  })
})

describe('OfferDetails on mobile', () => {
  const mobileData = {
    isLaptopAndAbove: false,
    isMobile: true,
    isTablet: false
  }
  beforeEach(() => {
    waitFor(() => {
      useBreakpoints.mockImplementation(() => mobileData)
      renderWithProviders(<OfferDetails />, {
        preloadedState: mockState
      })
    })
  })

  it('should display the offer details correctly', async () => {
    const authorAvgRating = await screen.findByText(
      mockOffer.author.averageRating.tutor
    )
    const title = screen.getByText(mockOffer.title)
    const name = screen.getByText(
      `${mockOffer.author.firstName} ${mockOffer.author.lastName}`
    )

    expect(authorAvgRating).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(name).toBeInTheDocument()
  })
})

describe('Offer details with student role', () => {
  beforeEach(() => {
    waitFor(() => {
      renderWithProviders(<OfferDetails />, {
        preloadedState: {
          appMain: { userId: '6421d9833cdf38b706756dff', userRole: 'student' }
        }
      })
    })
  })

  it('should render enroll offer button for students', async () => {
    const enrollOffer = await screen.findByText('common.labels.enrollOffer')

    waitFor(() => {
      fireEvent.click(enrollOffer)
    })

    expect(
      screen.getByText('offerDetailsPage.enrollOffer.title')
    ).toBeInTheDocument()
  })
})

describe('Should show Loader', () => {
  it('should render Loader - (loading from useAxios)', async () => {
    mockAxiosClient
      .onGet(`${URLs.offers.get}/${mockOffer._id}`)
      .reply(200, null)
    mockAxiosClient
      .onPatch(`${URLs.offers.update}/${mockOffer._id}`)
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
