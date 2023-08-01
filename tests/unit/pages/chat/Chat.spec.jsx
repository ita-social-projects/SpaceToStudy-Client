import { screen } from '@testing-library/react'
import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import { URLs } from '~/constants/request'
import useBreakpoints from '~/hooks/use-breakpoints'
import Chat from '~/pages/chat/Chat'

import { usersMock } from '~tests/unit/containers/chat/list-of-users-with-search/MockChat.spec.constants'

vi.mock('~/hooks/use-breakpoints')
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}))
global.window.getComputedStyle = vi.fn().mockImplementation(() => ({
  getPropertyValue: vi.fn()
}))

mockAxiosClient.onGet(`${URLs.chats.get}`).reply(200, usersMock)

describe('Chat for desctop', () => {
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
    const title = screen.getByText('It`s real chat')

    expect(title).toBeInTheDocument()
  })
})
