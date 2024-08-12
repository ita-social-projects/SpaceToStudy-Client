import { vi } from 'vitest'
import { fireEvent, screen } from '@testing-library/react'
import OfferContainer from '~/containers/find-offer/offer-container/OfferContainer'
import ChatDialogWindow from '~/containers/offer-page/chat-dialog-window/ChatDialogWindow'
import useBreakpoints from '~/hooks/use-breakpoints'
import {
  renderWithProviders,
  mockAxiosClient,
  TestSnackbar
} from '~tests/test-utils'
import { mockOffer } from '~tests/unit/pages/offer-details/OfferDetails.spec.constants'
import { userService } from '~/services/user-service'
import { ChatProvider } from '~/context/chat-context'

const mockRef = { current: { scrollTo: vi.fn(), scrollHeight: 100 } }

vi.mock('react', async () => {
  const actual = await vi.importActual('react')
  return {
    ...actual,
    useRef: () => vi.fn().mockReturnValue(mockRef)
  }
})

global.window.getComputedStyle = vi.fn().mockImplementation(() => ({
  getPropertyValue: vi.fn()
}))

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

  it('Should toggle an offer bookmark', async () => {
    renderWithProviders(
      <OfferContainer
        offerCards={[mockOffer]}
        viewMode={cardsViewEnums.inline}
      />
    )

    mockAxiosClient.onPatch().reply(200, [mockOffer._id])
    const toggleBookmarkSpy = vi.spyOn(userService, 'toggleBookmark')

    const bookmarkIcon = screen.getByTestId('TurnedInNotIcon')
    fireEvent.click(bookmarkIcon)

    const turnedInIcon = await screen.findByTestId('TurnedInIcon')

    expect(turnedInIcon).toBeInTheDocument()
    expect(toggleBookmarkSpy).toHaveBeenCalled()
  })

  it('Should show a snackbar with an error', async () => {
    renderWithProviders(
      <TestSnackbar>
        <OfferContainer
          offerCards={[mockOffer]}
          viewMode={cardsViewEnums.inline}
        />
      </TestSnackbar>
    )

    const mockError = { code: 'mockErrorCode', message: 'test error' }
    mockAxiosClient.onPatch().reply(400, mockError)

    const bookmarkIcon = screen.getByTestId('iconButton')
    fireEvent.click(bookmarkIcon)

    const snackbar = await screen.findByText(`errors.${mockError.code}`)

    expect(snackbar).toBeInTheDocument()
  })

  it('Should open a chat', async () => {
    const mockChatInfo = {
      author: {
        _id: '64944409a3a368915f9663f9',
        firstName: 'Jane',
        lastName: 'Dou'
      },
      authorRole: 'student',
      chatId: '64c299aa147fefbb6e00fe6c'
    }

    renderWithProviders(
      <ChatProvider>
        <OfferContainer
          offerCards={[mockOffer]}
          viewMode={cardsViewEnums.inline}
        />
        <ChatDialogWindow chatInfo={mockChatInfo} />
      </ChatProvider>
    )

    const sendMessageBtn = screen.getByText('common.labels.sendMessage')

    fireEvent.click(sendMessageBtn)

    const messageInput = await screen.findByLabelText(
      'chatPage.chat.inputLabel'
    )

    expect(messageInput).toBeInTheDocument()
  })
})
