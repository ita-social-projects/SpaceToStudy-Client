import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import AppHeader from '~/containers/layout/app-header/AppHeader'
import { ModalProvider } from '~/context/modal-context'
import { ConfirmationDialogProvider } from '~/context/confirm-context'

describe('AppHeader layout component test', () => {
  renderWithProviders(
    <ConfirmationDialogProvider>
      <ModalProvider>
        <AppHeader />
      </ModalProvider>
    </ConfirmationDialogProvider>
  )
  it('should render toolbar', () => {
    const toolbar = screen.getByTestId('toolbar')

    expect(toolbar).toBeInTheDocument()
  })
})
