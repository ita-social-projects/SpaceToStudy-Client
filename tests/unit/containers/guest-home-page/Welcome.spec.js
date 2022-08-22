import { screen } from '@testing-library/react'

import { renderWithProviders } from '~tests/test-utils'
import Welcome from '~/containers/guest-home-page/Welcome'

describe('Welcome component', () => {
  beforeEach(() => {
    renderWithProviders(<Welcome />)
  })

  it('should have title img', () => {
    const img = screen.getByAltText('Title')

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
