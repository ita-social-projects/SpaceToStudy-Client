import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ScrollToTopButton from '~/components/scroll-to-top-button/ScrollToTopButton'
import { vi } from 'vitest'
const jsdom = require('jsdom')
const { JSDOM } = jsdom

describe('ScrollToTopButton dialog test', () => {
  const dom = new JSDOM('<!DOCTYPE html>')

  const listener = vi.fn()

  const mockData = {
    element: {
      current: {
        addEventListener: listener,
        removeEventListener: listener
      }
    }
  }

  beforeEach(() => {
    render(<ScrollToTopButton {...mockData} />)
  })

  it('should show ArrowUpwardRoundedIcon', async () => {
    fireEvent.scroll(dom.window, { target: { scrollY: 500 } })
    waitFor(() =>
      expect(screen.findByTestId('ArrowUpwardRoundedIcon')).toBeInTheDocument()
    )
  })

  it('should show scroll to top', async () => {
    fireEvent.scroll(dom.window, { target: { scrollY: 500 } })
    waitFor(() => expect(screen.findByRole('button')).toBeInTheDocument())
  })
})
