import { fireEvent, screen, waitFor } from '@testing-library/react'
import { expect } from 'vitest'
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
  beforeEach(() => {
    renderWithProviders(<AccountIcon openMenu={mockOpenMenu} />, {
      preloadedState
    })
  })

  it('should render click menu icon and open account menu after click on it', async () => {
    const AccountIconButton = await screen.findByAltText('User')
    expect(AccountIconButton).toBeInTheDocument()

    fireEvent.click(AccountIconButton)

    await waitFor(() => {
      expect(mockOpenMenu).toHaveBeenCalled()
    })
  })
})
