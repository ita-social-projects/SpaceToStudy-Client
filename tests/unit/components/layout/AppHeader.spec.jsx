import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import AppHeader from '~/containers/layout/app-header/AppHeader'

describe('AppHeader layout component test', () => {
  renderWithProviders(<AppHeader />)
  it('should render toolbar', () => {
    const toolbar = screen.getByTestId('toolbar')

    expect(toolbar).toBeInTheDocument()
  })
})
