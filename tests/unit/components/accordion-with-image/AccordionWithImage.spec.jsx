import { render, screen, fireEvent } from '@testing-library/react'
import AccordionWithImage from '~/components/accordion-with-image/AccordionWithImage'
import MapLogo from '~/assets/img/guest-home-page/map.svg'
import Logo from '~/assets/logo.svg'

describe('AccordionWithImage component test', () => {
  const items = [
    {
      image: MapLogo,
      title: 'First test title',
      description: 'First test description'
    },
    {
      image: Logo,
      title: 'Second test title',
      description: 'Second test description'
    }
  ]
  beforeEach(() => {
    render(<AccordionWithImage items={items} />)
  })
  it('Test onChange id', () => {
    const id = screen.getByText('Second test title')
    fireEvent.click(id)

    expect(id).toBeInTheDocument()
  })
})
