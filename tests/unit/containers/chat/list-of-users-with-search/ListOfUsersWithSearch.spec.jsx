import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import ListOfUsersWithSearch from '~/containers/chat/list-of-users-with-search/ListOfUsersWithSearch'
import {
  usersMock,
  messages
} from '~/containers/chat/list-of-users-with-search/ListOfUsersWithSearch.constants'

const escapeKey = { key: 'Escape' }

const props = {
  search: '',
  setSearch: vi.fn(),
  listOfChats: usersMock,
  listOfFoundedMessages: messages,
  isSelectedChat: '',
  setIsSelectedChat: vi.fn()
}

describe('ListOfUsersWithSearch component', () => {
  beforeEach(() => {
    renderWithProviders(<ListOfUsersWithSearch {...props} />)
  })

  it('should render the search input', () => {
    const searchInput = screen.getByTestId('SearchIcon')
    expect(searchInput).toBeInTheDocument()
  })

  it('should call setSearch function on input change', () => {
    const searchInput = screen.getByLabelText('common.search')
    fireEvent.change(searchInput, { target: { value: 'Scott' } })
    expect(props.setSearch).toHaveBeenCalledWith('Scott')
  })

  it('calls setIsSelectedChat function when the "Escape" key is pressed', () => {
    document.dispatchEvent(new KeyboardEvent('keydown', escapeKey))

    expect(props.setIsSelectedChat).toHaveBeenCalledWith('')
  })

  it('renders "notFoundedMessages" information message when both chats and founded messages are empty', () => {
    renderWithProviders(
      <ListOfUsersWithSearch
        {...props}
        listOfChats={[]}
        listOfFoundedMessages={[]}
      />
    )

    const notFoundedMessage = screen.getByText('chatPage.notFoundedMessages')
    expect(notFoundedMessage).toBeInTheDocument()
  })

  it('renders "noContactsOrMessages" information message when chats array is empty', () => {
    renderWithProviders(<ListOfUsersWithSearch {...props} listOfChats={[]} />)

    const noContactsOrMessagesMessage = screen.getByText(
      'chatPage.noContactsOrMessages'
    )
    expect(noContactsOrMessagesMessage).toBeInTheDocument()
  })
})
