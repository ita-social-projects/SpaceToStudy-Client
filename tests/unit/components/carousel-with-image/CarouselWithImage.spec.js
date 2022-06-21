import { render, screen } from '@testing-library/react'
import CarouselWithImage from '~/components/carousel-with-image/CarouselWithImage'
import MapLogo from '~/assets/img/guest-home-page/map.svg'
import Logo from '~/assets/logo.svg'

describe('CarouselWithImage component test', () => {
  const items = [
    {
      image: MapLogo,
      title: 'guestHomePage.accordion.flexibleLocation.title',
      description: 'guestHomePage.accordion.flexibleLocation.description'
    },
    {
      image: Logo,
      title: 'guestHomePage.accordion.individualTime.title',
      description: 'guestHomePage.accordion.individualTime.description'
    }
  ]
  beforeEach(() => {
    render(<CarouselWithImage items={ items } />)
  })
  it('Test image', () => {
    const mapLogo = screen.getByAltText('map.svg')

    expect(mapLogo).toBeInTheDocument()
  })
})
