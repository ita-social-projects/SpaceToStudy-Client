import { render, screen } from '@testing-library/react'
import FeatureBlock from '~/containers/guest-home-page/FeatureBlock'
import MapLogo from '~/assets/img/guest-home-page/map.svg'
import useBreakpoints from '~/hooks/use-breakpoints'

jest.mock('~/hooks/use-breakpoints')

const items = [
  {
    image: MapLogo,
    title: 'First test title',
    description: 'First test description'
  }
]

describe('Carousel test', () => {
  it('Test should render carousel component', () => {
    useBreakpoints.mockImplementation(() => 'mobile')
    render(<FeatureBlock items={items} />)
    const component = screen.getByTestId('carousel')

    expect(component).toBeInTheDocument()
  })
})

describe('Accordion test', () => {
  it('Test should render accordion component', () => {
    useBreakpoints.mockImplementation(() => 'desktop')
    render(<FeatureBlock items={items} />)
    const component = screen.getByTestId('accordion')

    expect(component).toBeInTheDocument()
  })
})
