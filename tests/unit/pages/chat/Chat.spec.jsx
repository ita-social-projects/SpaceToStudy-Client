import { fireEvent, screen } from '@testing-library/react'
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
  beforeEach(() => {
    useBreakpoints.mockImplementation(() => desktopData)

    renderWithProviders(<Chat />)
  })
  it('should render user in a chat', async () => {
    const title = screen.getByText('Scott Short')

    expect(title).toBeInTheDocument()
  })

  it('should choose chat and render messages', async () => {
    const chatItem = screen.getByText('Scott Short')

    fireEvent.click(chatItem)

    const message = screen.getByText(chatsMock[1].latestMessage.text)

    expect(message).toBeInTheDocument()
  })

  it('should send new message and clear input', async () => {
    const chatItem = screen.getByText('Scott Short')

    fireEvent.click(chatItem)

    const messageInput = screen.getByLabelText('chatPage.chat.inputLabel')

    userEvent.type(messageInput, 'new message')

    expect(messageInput.value).toBe('new message')

    const sendBtn = screen.getByTestId('send-btn')

    fireEvent.click(sendBtn)

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
    const chip = screen.getByText('chatPage.chat.chipLabel')

    expect(chip).toBeInTheDocument()
  })
})
