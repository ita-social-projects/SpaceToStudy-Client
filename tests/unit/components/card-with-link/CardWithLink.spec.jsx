import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import CardWithLink from '~/components/card-with-link/CardWithLink'

const props = {
  id: '1',
  img: 'icon.png',
  description: 234,
  title: 'Languages',
  link: '#'
}

describe('CardWithLink component', () => {
  beforeEach(() => {
    renderWithProviders(<CardWithLink {...props} />)
  })

  it('should render icon', () => {
    const icon = screen.getByRole('img')

    expect(icon).toBeInTheDocument()
  })

  it('should render service title', () => {
    const title = screen.getByText(props.title)

    expect(title).toBeInTheDocument()
  })

  it('should render tutors count', () => {
    const count = screen.getByText(props.description)

    expect(count).toBeInTheDocument()
  })
})
