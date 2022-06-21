import { render, screen } from '@testing-library/react'
import FeatureBlock from '~/containers/guest-home-page/FeatureBlock'
import MapLogo from '~/assets/img/guest-home-page/map.svg'

let mockMobile = 'mobile'
jest.mock('~/hooks/use-breakpoints', () => {
  return () => mockMobile
})

const items = [
  {
    image: MapLogo,
    title: 'guestHomePage.accordion.flexibleLocation.title',
    description: 'guestHomePage.accordion.flexibleLocation.description'
  }
]

describe('Carousel test', () => {
  render(<FeatureBlock items={ items } />)

  it('Test if carousel render', () => {
    const component = screen.getByTestId('carousel')

    expect(component).toBeInTheDocument()
  })
})

describe('Accordion test', () => {
  mockMobile = 'desktop'
  render(<FeatureBlock items={ items } />)

  it('Test if accordion render', () => {
    const component = screen.queryByTestId('carousel')

    expect(component).not.toBeInTheDocument()
  })
})
