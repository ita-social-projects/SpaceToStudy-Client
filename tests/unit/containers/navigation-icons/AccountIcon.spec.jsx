import { fireEvent, screen, waitFor } from '@testing-library/react'
import AccountIcon from '~/containers/navigation-icons/AccountIcon'
import { renderWithProviders } from '~tests/test-utils'

const mockOpenMenu = vi.fn()

vi.mock('~/services/user-service', () => ({
  userService: {
    getUserById: () => ({
      data: { firstName: 'John', lastName: 'Doe', photo: 'path-to-photo' }
    })
  }
}))

describe('AccountIcon test with user role', () => {
  const preloadedState = { appMain: { userRole: 'tutor' } }
  beforeEach(async () => {
    await waitFor(() => {
      renderWithProviders(<AccountIcon openMenu={mockOpenMenu} />, {
        preloadedState
      })
    })
  })

  it('should render click menu icon and open account menu after click on it', () => {
    const AccountIconButton = screen.getByAltText('User Avatar')
    expect(AccountIconButton).toBeInTheDocument()

    fireEvent.click(AccountIconButton)

    expect(mockOpenMenu).toHaveBeenCalled()
  })
})
