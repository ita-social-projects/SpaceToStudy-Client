import { render, screen } from '@testing-library/react'
import { beforeAll, beforeEach } from 'vitest'
import AppCarousel from '~/components/app-carousel/AppCarousel'

const childrenText = 'I am a children'

describe('AppCarousel test', () => {
  beforeAll(() => {
    global.ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn()
    }))

    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    }))
  })

  beforeEach(() => {
    render(
      <AppCarousel settings={{}}>
        <p>{childrenText}</p>
      </AppCarousel>
    )
  })

  it('should render with children', () => {
    const children = screen.getByText(childrenText)
    expect(children).toBeInTheDocument()
  })
})
