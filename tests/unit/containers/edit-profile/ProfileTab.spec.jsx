import { fireEvent, screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import ProfileTab from '~/containers/edit-profile/profile-tab/ProfileTab'
import { userDataMock } from '~tests/unit/containers/edit-profile/profile-tab/profile-tab-form/ProfileTabForm.spec.constants'

const resetMock = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useBlocker: () => ({
      state: 'blocked',
      proceed: vi.fn(),
      reset: () => resetMock()
    })
  }
})

const handleSubmitMock = vi.fn()
vi.mock('~/hooks/use-update-user', () => ({
  default: () => ({
    handleSubmit: handleSubmitMock,
    loading: false
  })
}))

const checkConfirmationMock = vi.fn()
vi.mock('~/hooks/use-confirm', () => {
  return {
    default: () => ({
      setNeedConfirmation: () => true,
      checkConfirmation: () => checkConfirmationMock()
    })
  }
})

describe('ProfileTab', () => {
  it('should handle data updates', () => {
    checkConfirmationMock.mockResolvedValue(true)
    renderWithProviders(<ProfileTab user={userDataMock} />)

    const updateButton = screen.getByRole('button', {
      name: 'editProfilePage.profile.updateProfileBtn'
    })

    fireEvent.click(updateButton)

    expect(handleSubmitMock).toHaveBeenCalled()
  })

  it('should call the reset function if the page leave was not confirmed', async () => {
    checkConfirmationMock.mockResolvedValue(false)
    renderWithProviders(<ProfileTab user={userDataMock} />)

    await waitFor(() => {
      expect(resetMock).toHaveBeenCalled()
    })
  })
})
