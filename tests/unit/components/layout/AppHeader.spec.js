import { screen } from '@testing-library/react'
import AppHeader from '~/containers/layout/AppHeader'
import { renderWithRouterAndTheme } from '~tests/test-utils'

describe.skip('AppHeader layout component test', () => {
  it('should have button with about text', () => {
    renderWithRouterAndTheme(
      <AppHeader />
    )

    const linkElement = screen.getByText('common.about')
    expect(linkElement).toBeInTheDocument()
  })
})
