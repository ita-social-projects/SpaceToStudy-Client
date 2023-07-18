import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import ChatItem from '~/containers/chat/chat-item/ChatItem'

const user = {
  _id: '644e6b1668cc37f543f2f37c',
  firstName: 'Albus',
  lastName: 'Dumbledore',
  role: 'student'
}

const lastMessage = {
  text: 'Hello',
  chat: 'chat',
  author: {
    _id: '644e6b1778cc37f543f2f37c',
    firstName: 'Jane',
    lastName: 'Doe'
  },
  updatedAt: new Date().toISOString()
}
const isSelectedChat = 'chat'
const setIsSelectedChat = vi.fn()

const mockState = {
  appMain: { userId: '644e6b1778cc37f543f2f37c' }
}

describe('ChatItem', () => {
  it('renders correctly', () => {
    renderWithProviders(
      <ChatItem
        isSelectedChat={isSelectedChat}
        lastMessage={lastMessage}
        setIsSelectedChat={setIsSelectedChat}
        user={user}
      />,
      { preloadedState: mockState }
    )

    const message = screen.getByText('Hello')

    expect(screen.getByText('Albus Dumbledore')).toBeInTheDocument()

    expect(message).toBeInTheDocument()
    expect(screen.getByText('chatPage.yourMessage')).toBeInTheDocument()

    fireEvent.click(message)

    expect(setIsSelectedChat).toHaveBeenCalledWith('chat')
  })
})
