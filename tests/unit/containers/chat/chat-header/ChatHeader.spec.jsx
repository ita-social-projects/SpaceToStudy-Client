import { renderWithProviders } from '~tests/test-utils'
import ChatHeader from '~/containers/chat/chat-header/ChatHeader'
import { fireEvent, screen, act } from '@testing-library/react'
import useBreakpoints from '~/hooks/use-breakpoints'
import { vi } from 'vitest'

const user = {
  _id: '644e6b1668cc37f543f2f37c',
  firstName: 'Albus',
  lastName: 'Dumbledore',
  role: 'student'
}

const mockedChat = {
  _id: '64c299aa147fefbb6e00fe6c',
  members: [
    {
      user: {
        _id: '644e6b1778cc37f543f2f38c',
        firstName: 'test1',
        lastName: 'test1',
        photo: '1687425744398-ITA wallpapers-19.png'
      }
    },
    {
      user: {
        _id: '644e6b1778cc37f543f2f37c',
        firstName: 'test',
        lastName: 'test',
        photo: '1687425744398-ITA wallpapers-19.png'
      }
    }
  ],
  latestMessage: {
    author: {
      _id: '644e6b1778cc37f543f2f37c',
      firstName: 'test',
      lastName: 'test'
    },
    text: 'I have taken an introductory.',
    updatedAt: '2023-07-27T16:44:59.804Z'
  }
}

vi.mock('~/hooks/use-breakpoints', () => ({
  default: vi.fn()
}))

vi.mock('~/components/search-by-message/SearchByMessage', () => ({
  default: () => (
    <input aria-label='search' data-testid='mock-SearchByMessage' />
  )
}))

const mockedOnMenuClick = vi.fn()

describe('ChatHeader', () => {
  it('should show SearchByMessage component', async () => {
    const mobileData = {
      isLaptopAndAbove: false,
      isMobile: true,
      isTablet: false
    }
    useBreakpoints.mockImplementation(() => mobileData)
    renderWithProviders(
      <ChatHeader
        currentChat={mockedChat}
        messages={[]}
        onMenuClick={mockedOnMenuClick}
        user={user}
      />
    )

    const searchButton = screen.getByTestId('SearchIcon')
    expect(searchButton).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(searchButton)
    })

    const searchInput = screen.getByTestId('mock-SearchByMessage')

    expect(searchInput).toBeInTheDocument()
  })

  it('should show offline status', () => {
    renderWithProviders(
      <ChatHeader currentChat={mockedChat} messages={[]} user={user} />
    )

    const status = screen.getByText('chatPage.status.offline')
    expect(status).toBeInTheDocument()
  })
})
