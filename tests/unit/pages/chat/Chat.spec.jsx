import { fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import useBreakpoints from '~/hooks/use-breakpoints'
import Chat from '~/pages/chat/Chat'

import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import { createUrlPath } from '~/utils/helper-functions'
import { URLs } from '~/constants/request'
import {
  chatsMock,
  messagesMock
} from '~tests/unit/containers/chat/list-of-users-with-search/MockChat.spec.constants'

vi.mock('~/pages/chat/MessagesList', () => ({
  default: vi.fn(() => (
    <div data-testid='mock-messages-list'>
      {chatsMock[1].latestMessage.text}
    </div>
  ))
}))

vi.mock('~/hooks/use-breakpoints')
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}))
global.window.getComputedStyle = vi.fn().mockImplementation(() => ({
  getPropertyValue: vi.fn()
}))

const mockChatContext = {
  setCurrentChatId: vi.fn()
}

vi.mock('~/context/chat-context', () => ({
  useChatContext: () => mockChatContext
}))

const mockRef = { current: { scrollTo: vi.fn(), scrollHeight: 100 } }

vi.mock('react', async () => {
  const actual = await vi.importActual('react')
  return {
    ...actual,
    useRef: () => vi.fn().mockReturnValue(mockRef)
  }
})

const newMessageMock = { ...messagesMock[0], text: 'new message' }
const chat = createUrlPath(URLs.chats.get, chatsMock[1]._id)

mockAxiosClient.onGet(`${URLs.chats.get}`).reply(200, chatsMock)
mockAxiosClient.onGet(`${chat}${URLs.messages.get}`).reply(200, messagesMock)
mockAxiosClient
  .onPost(`${chat}${URLs.messages.post}`)
  .reply(200, newMessageMock)

describe('Chat for desktop', () => {
  const desktopData = {
    isLaptopAndAbove: true,
    isMobile: false,
    isTablet: false
  }
  beforeEach(async () => {
    useBreakpoints.mockImplementation(() => desktopData)

    await waitFor(() => {
      renderWithProviders(<Chat />)
    })
  })

  it('should render user in a chat', async () => {
    const title = await screen.findByText('Scott Short')

    expect(title).toBeInTheDocument()
  })

  it('should choose chat and render MessagesList component with messages', async () => {
    const chatItem = await screen.findByText('Scott Short')

    await waitFor(() => {
      fireEvent.click(chatItem)
    })

    const messagesList = screen.getByTestId('mock-messages-list')
    expect(messagesList).toBeInTheDocument()

    expect(messagesList).toHaveTextContent(chatsMock[1].latestMessage.text)
  })

  it('should send new message and clear input', async () => {
    const user = userEvent.setup()

    const chatItem = screen.getByText('Scott Short')

    waitFor(() => {
      fireEvent.click(chatItem)
    })

    const messageInput = await screen.findByLabelText(
      'chatPage.chat.inputLabel'
    )

    await user.type(messageInput, 'new message')

    expect(messageInput.value).toBe('new message')

    const sendBtn = screen.getByTestId('send-btn')

    waitFor(() => {
      fireEvent.click(sendBtn)
    })

    expect(messageInput.value).toBe('')
  })
})

describe('Chat for mobile', () => {
  const mobileData = {
    isLaptopAndAbove: false,
    isMobile: true,
    isTablet: false
  }
  beforeEach(() => {
    useBreakpoints.mockImplementation(() => mobileData)

    renderWithProviders(<Chat />)
  })
  it('should render just right pane in a chat', async () => {
    const chip = await screen.findByText('chatPage.chat.chipLabel')

    expect(chip).toBeInTheDocument()
  })
})
