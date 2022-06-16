import { screen } from '@testing-library/react'

import { renderWithRouterAndTheme } from '~tests/test-utils'
import WelcomeBlock from '~/containers/guest-home-page/WelcomeBlock'

describe('WelcomeBlock component', () => {
  beforeEach(() => {
    renderWithRouterAndTheme(
      <WelcomeBlock />
    )
  })

  it('should have title img', () => {
    const img = screen.getByTestId('titleImg')

    expect(img).toBeInTheDocument()
  })

  it('should have correct description', () => {
    const title = screen.getByTestId('description')

    expect(title).toBeInTheDocument()
  })

  it('should have button with correct text', () => {
    const btn = screen.getByTestId('getStarted')

    expect(btn).toBeInTheDocument()
  })
})
