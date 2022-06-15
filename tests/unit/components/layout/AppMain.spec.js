import { screen } from '@testing-library/react'
import { renderWithRouterAndTheme } from '~tests/test-utils'
import AppMain from '~/containers/layout/AppMain'

describe.skip('AppMain layout component test', () => {
  it('should have button with about text', () => {
    renderWithRouterAndTheme(
      <AppMain />
    )
    const linkElement = screen.getByText('common.title')
    expect(linkElement).toBeInTheDocument()
  })
})
