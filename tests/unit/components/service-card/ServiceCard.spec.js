import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import ServiceCard from '~/components/service-card/ServiceCard'

const props = {
  id: '1',
  img: 'icon.png',
  count: 234,
  title: 'Languages',
  link: '#'
}

describe('ServiceCard component', () => {
  beforeEach(()=>{
    renderWithProviders(<ServiceCard { ...props } />)
  })

  it('should render icon', () => {
    const icon = screen.getByRole('img')

    expect(icon).toBeInTheDocument()
  })

  it('should render service title', () => {
    const title = screen.getByText(props.title)

    expect(title).toBeInTheDocument()
  })

  it('should render mentors count', () => {
    const count = screen.getByText(`${props.count} mentors`)

    expect(count).toBeInTheDocument()
  })
})
