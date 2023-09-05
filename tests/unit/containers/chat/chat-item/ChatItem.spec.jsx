import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import ChatItem from '~/containers/chat/chat-item/ChatItem'

const mockChatContext = {
  setCurrentChatId: vi.fn()
}

vi.mock('~/context/chat-context', () => ({
  useChatContext: () => mockChatContext
}))

const user = {
  _id: '644e6b1668cc37f543f2f37c',
  firstName: 'Albus',
  lastName: 'Dumbledore',
  role: 'student'
}

const chat = {
  _id: '64c299aa147fefbb6e00fe6c',
  members: [
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
const setSelectedChat = vi.fn()

const mockState = {
  appMain: { userId: '644e6b1778cc37f543f2f37c' }
}

describe('ChatItem', () => {
  it('renders correctly', () => {
    renderWithProviders(
      <ChatItem chat={chat} setSelectedChat={setSelectedChat} user={user} />,
      { preloadedState: mockState }
    )

    const message = screen.getByText('I have taken an introductory.')
    const userName = screen.getByText('test test')
    const myMessage = screen.getByText('chatPage.message.you:')

    expect(userName).toBeInTheDocument()
    expect(message).toBeInTheDocument()
    expect(myMessage).toBeInTheDocument()

    fireEvent.click(message)

    expect(setSelectedChat).toHaveBeenCalledWith(chat)
    expect(mockChatContext.setCurrentChatId).toHaveBeenCalledWith(null)
  })
})
