import { screen, fireEvent, act, waitForElementToBeRemoved } from '@testing-library/react'
import { ModalProvider } from '~/context/modal-context'
import { renderWithProviders } from '~tests/test-utils'
import NavBar from '~/containers/layout/navbar/NavBar'
import { ConfirmationDialogProvider } from '~/context/confirm-context'
import { SnackBarProvider } from '~/context/snackbar-context'
import { vi } from 'vitest'

vi.mock('~/containers/guest-home-page/google-button/GoogleButton', () => ({
  __esModule: true,
  default: function () {
    return <button>Google</button>
  }
}))

describe('modal context', () => {
  beforeEach(() => {
    renderWithProviders(
      <SnackBarProvider>
        <ConfirmationDialogProvider>
          <ModalProvider>
            <NavBar />
          </ModalProvider>
        </ConfirmationDialogProvider>
      </SnackBarProvider>
    )

    const button = screen.getByText('header.loginButton')
    act(() => {
      fireEvent.click(button)
    })
    const inputNode = screen.getByLabelText(/common.labels.password/i)
    act(() => {
      fireEvent.change(inputNode, { target: { value: 'test' } })
    })
    act(() => {
      fireEvent.blur(inputNode)
    })
    const closeButton = screen.getByTestId('CloseIcon')
    act(() => {
      fireEvent.click(closeButton)
    })
  })

  it('should open modal popup', () => {
    const popup = screen.getByTestId('popup')

    expect(popup).toBeInTheDocument()
  })

  it('should request confirmation if left with filled form', () => {
    const confirmDialog = screen.getByTestId('confirmDialog')

    expect(confirmDialog).toBeInTheDocument()
  })

  it('should not close popup if dismiss confirmation', async () => {
    const dismissButton = screen.getByText('common.no')
    act(() => {
      fireEvent.click(dismissButton)
    })
    const popup = screen.getByTestId('popup')

    await waitForElementToBeRemoved(screen.getByTestId('confirmDialog'))

    expect(popup).toBeInTheDocument()
  })

  it('should close popup if accept confirmation', async () => {
    const confirmButton = screen.getByText('common.yes')
    act(() => {
      fireEvent.click(confirmButton)
    })

    const popup = screen.getByTestId('popup')

    await waitForElementToBeRemoved(screen.getByTestId('confirmDialog'))

    expect(popup).not.toBeInTheDocument()
  })
})
