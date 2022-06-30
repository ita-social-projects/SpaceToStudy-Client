import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import AppHeader from '~/containers/layout/AppHeader'
import { ModalProvider } from '~/context/modal-context'

describe('AppHeader layout component test', () => {
  renderWithProviders(
    <ModalProvider>
      <AppHeader />
    </ModalProvider>
  )
  it('should render toolbar', () => {
    const toolbar = screen.getByTestId('toolbar')

    expect(toolbar).toBeInTheDocument()
  })
})
