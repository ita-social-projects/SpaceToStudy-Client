import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import ProfileTab from '~/containers/edit-profile/profile-tab/ProfileTab'
import { userDataMock } from '~tests/unit/containers/edit-profile/profile-tab/profile-tab-form/ProfileTabForm.spec.constants'

const handleSubmitMock = vi.fn()
vi.mock('~/hooks/use-update-user', () => ({
  default: () => ({
    handleSubmit: handleSubmitMock,
    loading: false
  })
}))

vi.mock('~/hooks/use-confirm', () => {
  return {
    default: () => ({
      setNeedConfirmation: () => true
    })
  }
})

describe('ProfileTab', () => {
  it('should handle data updates', () => {
    renderWithProviders(<ProfileTab user={userDataMock} />)

    const updateButton = screen.getByRole('button', {
      name: 'editProfilePage.profile.updateProfileBtn'
    })

    fireEvent.click(updateButton)

    expect(handleSubmitMock).toHaveBeenCalled()
  })
})
