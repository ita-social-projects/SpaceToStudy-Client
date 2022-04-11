import { screen } from '@testing-library/react'
import AppHeader from '~/containers/layout/AppHeaders'
import { renderWithRouter } from '~tests/test-utils'

describe('AppHeader layout component test', () => {
  it('should have button with about text', () => {
    renderWithRouter(
      <AppHeader />
    )

    const linkElement = screen.getByText('common.about')
    expect(linkElement).toBeInTheDocument()
  })
})
