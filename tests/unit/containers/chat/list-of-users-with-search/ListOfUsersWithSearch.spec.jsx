import { screen, fireEvent, waitFor } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import ListOfUsersWithSearch from '~/containers/chat/list-of-users-with-search/ListOfUsersWithSearch'
import { chatsMock } from '~tests/unit/containers/chat/list-of-users-with-search/MockChat.spec.constants'

vi.mock('simplebar-react', () => {
  return {
    default: ({ children }) => <div>{children}</div>
  }
})

// vi.mock('~/hooks/use-redux', () => ({
//   useAppSelector: vi.fn().mockReturnValue({ userId: '644e6b1668cc37f543f2f37a' })
// }))

const props = {
  listOfChats: chatsMock,
  selectedChat: null,
  setSelectedChat: vi.fn(),
  closeDrawer: vi.fn()
}

describe('ListOfUsersWithSearch component', () => {
  beforeEach(() => {
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
    expect(chatItems.length).toBe(chatsMock.length)
  })

  it('filters chats based on search input', () => {
    const searchInput = screen.getByLabelText('common.search')

    fireEvent.change(searchInput, { target: { value: 'Alaya' } })

    const filteredChatItems = screen.getAllByTestId('chat-item')
    waitFor(() => {
      expect(filteredChatItems.length).toBe(1)
      expect(filteredChatItems[0]).toHaveTextContent('Alaya McKenzie')
    })
  })

  it('calls setSelectedChat when a chat is clicked', () => {
    const chatItem = screen.getAllByTestId('chat-item')[0]

    fireEvent.click(chatItem)

    expect(props.setSelectedChat).toHaveBeenCalledWith(chatsMock[0])
  })
})
