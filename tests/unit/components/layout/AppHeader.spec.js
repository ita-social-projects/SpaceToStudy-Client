import { screen } from '@testing-library/react'
import AppHeader from '~/containers/layout/AppHeader'
import { renderWithProviders } from '~tests/test-utils'

describe.skip('AppHeader layout component test', () => {
  it('should have button with about text', () => {
    renderWithProviders(
      <AppHeader />
    )

    const linkElement = screen.getByText('common.about')
    expect(linkElement).toBeInTheDocument()
  })
})
