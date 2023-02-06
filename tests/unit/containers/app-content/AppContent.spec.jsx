import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import { vi } from 'vitest'
import { ModalProvider } from '~/context/modal-context'
import AppContent from '~/containers/app-content/AppContent'

describe('AppContent container', () => {
  window.scrollTo = vi.fn()

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
