import { render, screen } from '@testing-library/react'
import { beforeEach } from 'vitest'
import AppCarousel from '~/components/app-carousel/AppCarousel'
import palette from '~/styles/app-theme/app.pallete'

const childrenText = 'I am a children'

const arrowStyles = { typography: 'h5', color: 'primary.500' }

const carouselSettings = {
  slidesToShow: 3,
  defaultControlsConfig: {
    pagingDotsStyle: { display: 'block' }
  },
  leftButtonStyles: {
    display: 'inline-flex',
    left: '-34px',
    stroke: palette.primary[500],
    strokeWidth: 2
  },
  rightButtonStyles: {
    display: 'inline-flex',
    right: '-34px',
    stroke: palette.primary[500],
    strokeWidth: 2
  },
  leftArrowStyles: arrowStyles,
  rightArrowStyles: arrowStyles
}

describe('AppCarousel test', () => {
  beforeEach(() => {
    render(
      <AppCarousel settings={carouselSettings}>
        <p>{childrenText}</p>
      </AppCarousel>
    )
  })

  it('should render with children', () => {
    const children = screen.getByText(childrenText)
    expect(children).toBeInTheDocument()
  })
})
