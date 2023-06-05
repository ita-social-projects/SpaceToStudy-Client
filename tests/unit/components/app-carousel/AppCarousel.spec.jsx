import { render, screen } from '@testing-library/react'
import { beforeEach } from 'vitest'
import AppCarousel from '~/components/app-carousel/AppCarousel'

const childrenText = 'I am a children'

describe('AppCarousel test', () => {
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
