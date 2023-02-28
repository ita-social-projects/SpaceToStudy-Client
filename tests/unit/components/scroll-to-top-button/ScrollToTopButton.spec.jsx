import { render, screen, fireEvent } from '@testing-library/react'
import ScrollToTopButton from '~/components/scroll-to-top-button/ScrollToTopButton'
import { vi } from 'vitest'
import GuestHomePage from '~/pages/guest-home-page/GuestHome'
const jsdom = require('jsdom')
const { JSDOM } = jsdom

describe('ScrollToTopButton dialog test', () => {

  const dom = new JSDOM(<GuestHomePage />)


  const listener = vi.fn()
 
  const mockData = {
    element:{
      current: {
        addEventListener:listener,
        removeEventListener:listener
      }
    }
  }

  beforeEach(() => {
    render(<ScrollToTopButton { ...mockData } />)
  })  

  it('should show ArrowUpwardRoundedIcon', () => {
    fireEvent.scroll(dom.window, { target: { scrollY: 500 } })
    const icon = screen.getByTestId('ArrowUpwardRoundedIcon')
    expect(icon).toBeInTheDocument()
  })

  it('should show scroll to top', () => {
    fireEvent.scroll(dom.window, { target: { scrollY: 500 } })
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })
})
