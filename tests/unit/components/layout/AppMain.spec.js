import { screen } from '@testing-library/react'
import { renderWithRouter } from '~tests/test-utils'
import AppMain from '~/containers/layout/AppMain'

describe('AppMain layout component test', () => {
  it('should have button with about text', () => {
    renderWithRouter(
      <AppMain />
    )
    const linkElement = screen.getByText('common.title')
    expect(linkElement).toBeInTheDocument()
  })
})
