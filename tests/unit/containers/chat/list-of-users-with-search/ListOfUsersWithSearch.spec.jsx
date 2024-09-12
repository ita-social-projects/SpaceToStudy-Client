import { screen, fireEvent, waitFor } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import { useAppSelector } from '~/hooks/use-redux'

import ListOfUsersWithSearch from '~/containers/chat/list-of-users-with-search/ListOfUsersWithSearch'
import { chatsMock } from '~tests/unit/containers/chat/list-of-users-with-search/MockChat.spec.constants'

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
  selectedChat: null,
  setSelectedChat: vi.fn(),
  closeDrawer: vi.fn()
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
    const chatItems = screen.getAllByAltText('User Avatar')

    expect(chatItems.length).toBe(chatsMock.length)
  })

  it('filters chats based on search input', () => {
    const searchInput = screen.getByLabelText('common.search')

    fireEvent.change(searchInput, { target: { value: 'Alaya' } })

    const filteredChatItems = screen.getAllByAltText('User Avatar')
    waitFor(() => {
      expect(filteredChatItems.length).toBe(1)
      expect(filteredChatItems[0]).toHaveTextContent('Alaya McKenzie')
    })
  })

  it('calls setSelectedChat when a chat is clicked', () => {
    const chatItem = screen.getAllByAltText('User Avatar')[0]

    fireEvent.click(chatItem)

    expect(props.setSelectedChat).toHaveBeenCalledWith(chatsMock[0])
  })
})
