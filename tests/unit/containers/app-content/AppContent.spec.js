import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import { ModalProvider } from '~/context/modal-context'
import AppContent from '~/containers/app-content/AppContent'

describe('AppContent container', () => {
  it('should render container on the page', () => {
    renderWithProviders(
      <ModalProvider>
        <AppContent />
      </ModalProvider>
    )

    const content = screen.getByTestId('AppContent')

    expect(content).toBeInTheDocument()
  })
})
