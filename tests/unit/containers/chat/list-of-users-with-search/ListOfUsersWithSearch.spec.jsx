import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import ListOfUsersWithSearch from '~/containers/chat/list-of-users-with-search/ListOfUsersWithSearch'
import { chatsMock } from '~tests/unit/containers/chat/list-of-users-with-search/MockChat.spec.constants'

vi.mock('simplebar-react', () => {
  return {
    default: ({ children }) => <div>{children}</div>
  }
})

const props = {
  listOfChats: chatsMock,
  selectedChat: null,
  setSelectedChat: vi.fn()
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
})
