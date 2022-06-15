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
