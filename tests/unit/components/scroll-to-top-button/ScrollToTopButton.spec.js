import { render, screen, fireEvent } from '@testing-library/react'
import ScrollToTopButton from '~/components/scroll-to-top-button/ScrollToTopButton'

describe('ScrollToTopButton dialog test', () => {
  window.scrollTo = jest.fn()

  beforeEach(() => {
    render(<ScrollToTopButton />)
  })

  it('should show ArrowUpwardRoundedIcon', () => {
    fireEvent.scroll(window, { target: { scrollY: 500 } })
    const icon = screen.getByTestId('ArrowUpwardRoundedIcon')

    expect(icon).toBeInTheDocument()
  })

  it('should show scroll to top', () => {
    fireEvent.scroll(window, { target: { scrollY: 500 } })
    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()

    fireEvent.scroll(window, { target: { scrollY: 0 } })

    expect(button).not.toBeInTheDocument()
  })
})
