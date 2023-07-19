import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import ListOfUsersWithSearch from '~/containers/chat/list-of-users-with-search/ListOfUsersWithSearch'
import { usersMock } from './chatMock'

const props = {
  listOfChats: usersMock,
  isSelectedChat: '',
  setIsSelectedChat: vi.fn()
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
