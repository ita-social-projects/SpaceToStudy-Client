import { fireEvent, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'

import BookmarkedOffers from '~/pages/bookmarked-offers/BookmarkedOffers'

import { mockAxiosClient, renderWithProviders } from '~tests/test-utils'
import { createUrlPath } from '~/utils/helper-functions'
import { URLs } from '~/constants/request'
import { offersMock } from '~tests/unit/pages/bookmarked-offers/BookmarkedOffers.constants'
import { authRoutes } from '~/router/constants/authRoutes'

const mockNavigate = vi.fn()
const mockSetSearchParams = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useSearchParams: () => [new URLSearchParams(), mockSetSearchParams]
  }
})

const mockUserId = '66b0aecdadd1fe775238c7d5'
const preloadedState = { appMain: { userId: mockUserId } }
const getBookmarksUrl = `${createUrlPath(URLs.users.get, mockUserId)}${
  URLs.users.getBookmarks
}`

describe('BookmarkedOffers page with offers', () => {
  beforeEach(async () => {
    mockAxiosClient
      .onGet(getBookmarksUrl)
      .reply(200, { items: offersMock, count: offersMock.length })

    await waitFor(() => {
      renderWithProviders(<BookmarkedOffers />, { preloadedState })
    })
  })

  it('should render the page with offers', async () => {
    const offer1Title = await screen.findByText(offersMock[0].title)
    const offer2Title = await screen.findByText(offersMock[1].title)

    expect(offer1Title).toBeInTheDocument()
    expect(offer2Title).toBeInTheDocument()
  })

  it('should change the page number', async () => {
    const pageNumber = 2
    const goToPageBtn = await screen.findByText(`${pageNumber}`, {
      selector: 'button'
    })

    fireEvent.click(goToPageBtn)

    expect(mockSetSearchParams).toHaveBeenCalledWith(
      new URLSearchParams({ page: pageNumber })
    )
  })
})

describe('BookmarkedOffers page without offers', () => {
  beforeEach(async () => {
    mockAxiosClient.onGet(getBookmarksUrl).reply(200, { items: [], count: 0 })

    await waitFor(() => {
      renderWithProviders(<BookmarkedOffers />, { preloadedState })
    })
  })

  it('should render the page without offers', async () => {
    const pageTitle = await screen.findByText('bookmarkedOffers.notFound.title')
    const pageDescription = await screen.findByText(
      'bookmarkedOffers.notFound.description'
    )

    expect(pageTitle).toBeInTheDocument()
    expect(pageDescription).toBeInTheDocument()
  })

  it('should navigate to the offers page', async () => {
    const goToOffersBtn = await screen.findByText('common.goToOffers')

    fireEvent.click(goToOffersBtn)

    expect(mockNavigate).toHaveBeenCalledWith(authRoutes.findOffers.path)
  })
})
