import { vi } from 'vitest'
import {
  screen,
  fireEvent,
  waitForElementToBeRemoved,
  within,
  waitFor
} from '@testing-library/react'
import {
  mockAxiosClient,
  renderWithProviders,
  TestSnackbar
} from '~tests/test-utils'
import PasswordSecurityTab from '~/containers/edit-profile/password-security-tab/PasswordSecurityTab'
import { openAlert } from '~/redux/features/snackbarSlice'
import { snackbarVariants } from '~/constants'
import { URLs } from '~/constants/request'

const userDataMock = {
  _id: '123456'
}

vi.mock('~/redux/features/snackbarSlice', async () => {
  const actual = await vi.importActual('~/redux/features/snackbarSlice')
  return {
    ...actual,
    openAlert: vi.fn()
  }
})

const renderWithMockData = () => {
  renderWithProviders(
    <TestSnackbar>
      <PasswordSecurityTab />
    </TestSnackbar>,
    {
      preloadedState: {
        appMain: {
          userId: userDataMock._id,
          userStatus: 'active'
        }
      }
    }
  )
}

describe('PasswordSecurityTab', () => {
  beforeEach(() => {
    renderWithMockData()
  })

  it('renders title and description', () => {
    const title = screen.getByText(
      'editProfilePage.profile.passwordSecurityTab.title'
    )
    const description = screen.getByText(
      'editProfilePage.profile.passwordSecurityTab.subTitle'
    )
    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  it('renders title and description change password', () => {
    const title = screen.getByText(
      'editProfilePage.profile.passwordSecurityTab.deactivateTitle'
    )
    const description = screen.getByText(
      'editProfilePage.profile.passwordSecurityTab.deactivateSubTitle'
    )
    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  it('renders title and description deactivate account', () => {
    const deactivateAccountButton = screen.getByText(
      'editProfilePage.profile.passwordSecurityTab.deactivateAccount'
    )

    fireEvent.click(deactivateAccountButton)

    const deactivateDescription = screen.getByText(
      'editProfilePage.profile.passwordSecurityTab.deactivateDescription'
    )
    expect(deactivateDescription).toBeInTheDocument()
  })

  it('checks if ConfirmDialog is closed when cancel button is clicked', async () => {
    const deactivateAccountButton = screen.getByText(
      'editProfilePage.profile.passwordSecurityTab.deactivateAccount'
    )
    let deactivateDescription

    fireEvent.click(deactivateAccountButton)

    const cancelButton = screen.getByText('common.cancel')
    fireEvent.click(cancelButton)

    await waitForElementToBeRemoved(() => {
      deactivateDescription = screen.queryByText(
        'editProfilePage.profile.passwordSecurityTab.deactivateDescription'
      )
      return deactivateDescription
    })

    expect(deactivateDescription).not.toBeInTheDocument()
  })
  it('should open the modal when clicking the Deactivate account button', () => {
    const deactivateAccountButton = screen.getByText(
      'editProfilePage.profile.passwordSecurityTab.deactivateAccount'
    )
    fireEvent.click(deactivateAccountButton)

    const modal = screen.getByRole('dialog')
    const deactivateTitle = within(modal).getByText(
      'editProfilePage.profile.passwordSecurityTab.deactivateTitle'
    )
    const deactivateDescription = within(modal).getByText(
      'editProfilePage.profile.passwordSecurityTab.deactivateDescription'
    )
    expect(deactivateTitle).toBeInTheDocument()
    expect(deactivateDescription).toBeInTheDocument()
  })
  it('should render Deactivate and Cancel buttons in the modal', () => {
    const deactivateAccountButton = screen.getByText(
      'editProfilePage.profile.passwordSecurityTab.deactivateAccount'
    )
    fireEvent.click(deactivateAccountButton)

    const deactivateButton = screen.getByText(
      'editProfilePage.profile.passwordSecurityTab.deactivateBtn'
    )
    const cancelButton = screen.getByText('common.cancel')

    expect(deactivateButton).toBeInTheDocument()
    expect(cancelButton).toBeInTheDocument()
  })
  it('should close modal on Cancel button click and stays on Password & Security tab', () => {
    const deactivateAccountButton = screen.getByText(
      'editProfilePage.profile.passwordSecurityTab.deactivateAccount'
    )
    fireEvent.click(deactivateAccountButton)

    const cancelButton = screen.getByText('common.cancel')
    fireEvent.click(cancelButton)

    const tabTitle = screen.getByText(
      'editProfilePage.profile.passwordSecurityTab.title'
    )
    expect(tabTitle).toBeInTheDocument()
  })
  it('should appear success message after clicking the Deactivate button', async () => {
    mockAxiosClient
      .onPatch(`${URLs.users.deactivate}/${userDataMock._id}`)
      .reply(204)

    const deactivateAccountButton = screen.getByText(
      'editProfilePage.profile.passwordSecurityTab.deactivateAccount'
    )
    fireEvent.click(deactivateAccountButton)

    const deactivateButton = screen.getByText(
      'editProfilePage.profile.passwordSecurityTab.deactivateBtn'
    )
    expect(deactivateButton).toBeInTheDocument()
    fireEvent.click(deactivateButton)

    await waitFor(() => {
      expect(openAlert).toHaveBeenCalledWith({
        severity: snackbarVariants.success,
        message: 'editProfilePage.profile.successMessage'
      })
    })
  })
})
