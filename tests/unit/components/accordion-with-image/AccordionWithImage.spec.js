import { render, screen, fireEvent } from '@testing-library/react'
import AccordionWithImage from '~/components/accordion-with-image/AccordionWithImage'
import MapLogo from '~/assets/img/guest-home-page/map.svg'
import Logo from '~/assets/logo.svg'

describe('AccordionWithImage component test', () => {
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
    render(<AccordionWithImage items={ items } />)
  })
  it('Test onChange id', () => {
    const id = screen.getByText('guestHomePage.accordion.individualTime.title')
    fireEvent.click(id)

    expect(id).toBeInTheDocument()
  })
})
