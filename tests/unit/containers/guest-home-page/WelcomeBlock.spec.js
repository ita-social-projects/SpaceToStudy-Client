import { screen, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import WelcomeBlock from '~/containers/guest-home-page/WelcomeBlock'

describe('WelcomeBlock component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <WelcomeBlock />
      </MemoryRouter>
    )
  })

  it('should have title img', () => {
    screen.debug()
    const img = screen.getByRole('img')

    expect(img).toBeInTheDocument()
  })

  it('should have correct description', () => {
    const text = screen.getByText('guestHomePage.welcomeBlock.description')

    expect(text).toBeInTheDocument()
  })

  it('should have button with correct text', () => {
    const text = screen.getByText('guestHomePage.welcomeBlock.getStarted')

    expect(text).toBeInTheDocument()
  })
})
