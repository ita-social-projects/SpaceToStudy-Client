import { render, screen } from '@testing-library/react'
import About from '~/pages/about/About'

describe('About page test', () => {
  it('should have about text', () => {
    render(
      <About />
    )

    const linkElement = screen.getByText('common.about')
    expect(linkElement).toBeInTheDocument()
  })
})
