import { fireEvent, screen } from '@testing-library/react'

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

const mockRef = { current: { scrollTo: vi.fn(), scrollHeight: 100 } }

vi.mock('react', async () => {
  const actual = await vi.importActual('react')
  return {
    ...actual,
    useRef: () => vi.fn().mockReturnValue(mockRef)
  }
})

const chat = createUrlPath(URLs.chats.get, chatsMock[1]._id)

mockAxiosClient.onGet(`${URLs.chats.get}`).reply(200, chatsMock)
mockAxiosClient.onGet(`${chat}${URLs.messages.get}`).reply(200, messagesMock)

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
