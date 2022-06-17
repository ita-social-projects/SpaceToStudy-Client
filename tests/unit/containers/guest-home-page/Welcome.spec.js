import { screen } from '@testing-library/react'

import { renderWithRouterAndTheme } from '~tests/test-utils'
import Welcome from '~/containers/guest-home-page/Welcome'

describe('Welcome component', () => {
  beforeEach(() => {
    renderWithRouterAndTheme(
      <Welcome />
    )
  })

  it('should have title img', () => {
    const img = screen.getByTestId('welcomeTitleImg')

    expect(img).toBeInTheDocument()
  })

  it('should have correct description', () => {
    const title = screen.getByTestId('welcomeDescription')

    expect(title).toBeInTheDocument()
  })

  it('should have button with correct text', () => {
    const btn = screen.getByTestId('welcomeGetStarted')

    expect(btn).toBeInTheDocument()
  })
})
