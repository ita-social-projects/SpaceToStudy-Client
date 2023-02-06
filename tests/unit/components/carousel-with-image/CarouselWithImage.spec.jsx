import { render, screen } from '@testing-library/react'
import CarouselWithImage from '~/components/carousel-with-image/CarouselWithImage'
import MapLogo from '~/assets/img/guest-home-page/map.svg'
import Logo from '~/assets/logo.svg'

describe('CarouselWithImage component test', () => {
  const items = [
    {
      image: MapLogo,
      title: 'title1',
      description: 'description1'
    },
    {
      image: Logo,
      title: 'title2',
      description: 'description2'
    }
  ]
  beforeEach(() => {
    render(<CarouselWithImage items={items} />)
  })
  it('Test image', () => {
    const mapLogo = screen.getByAltText('/src/assets/img/guest-home-page/map.svg')

    expect(mapLogo).toBeInTheDocument()
  })
})
