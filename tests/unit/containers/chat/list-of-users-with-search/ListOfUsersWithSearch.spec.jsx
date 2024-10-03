import { screen, fireEvent, waitFor } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import { useAppSelector } from '~/hooks/use-redux'

import ListOfUsersWithSearch from '~/containers/chat/list-of-users-with-search/ListOfUsersWithSearch'
import { chatsMock } from '~tests/unit/containers/chat/list-of-users-with-search/MockChat.constants'

vi.mock('simplebar-react', () => {
  return {
    default: ({ children }) => <div>{children}</div>
  }
})

vi.mock('~/hooks/use-redux', () => ({
  useAppSelector: vi.fn()
}))

const props = {
  listOfChats: chatsMock,
  selectedChat: chatsMock[0],
  setSelectedChat: vi.fn(),
  closeDrawer: vi.fn(),
  usersOnline: new Set()
}

describe('ListOfUsersWithSearch component', () => {
  beforeEach(() => {
    useAppSelector.mockReturnValue({ userId: '644e6b1668cc37f543f2f37a' })
    renderWithProviders(<ListOfUsersWithSearch {...props} />)
  })

  it('should render the search input', () => {
    const searchInput = screen.getByLabelText('common.search')
    expect(searchInput).toBeInTheDocument()
  })

  it('renders "notFoundedChats"', () => {
    renderWithProviders(<ListOfUsersWithSearch {...props} listOfChats={[]} />)

    const notFoundedChats = screen.getByText('chatPage.noContacts')
    expect(notFoundedChats).toBeInTheDocument()
  })

  it('renders chat items when chats are present', () => {
    const chatItems = screen.getAllByTestId('chat-item')

    expect(chatItems.length).toBe(chatsMock.length - 1)
  })

  it('filters chats based on search input', () => {
    const searchInput = screen.getByLabelText('common.search')

    fireEvent.change(searchInput, { target: { value: 'alaya' } })

    const filteredChatItems = screen.getAllByTestId('chat-item')
    waitFor(() => {
      expect(filteredChatItems.length).toBe(1)
      expect(filteredChatItems).toHaveTextContent('Alaya McKenzie')
      expect(filteredChatItems._id).toBe(chatsMock[1]._id)
    })
  })

  it('calls setSelectedChat when a chat is clicked', async () => {
    const chatItem = screen.getAllByTestId('chat-item')[0]

    fireEvent.click(chatItem)
    await waitFor(() => {
      expect(props.setSelectedChat).toHaveBeenCalledWith(chatsMock[0])
    })
  })
})
