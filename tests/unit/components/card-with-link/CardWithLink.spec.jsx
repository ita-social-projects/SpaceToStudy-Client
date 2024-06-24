import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import CardWithLink from '~/components/card-with-link/CardWithLink'

const props = {
  icon: 'LanguageIcon',
  iconColor: '#ffffff',
  description: 234,
  title: 'Languages',
  link: '#'
}

describe('CardWithLink component', () => {
  it('should render icon', () => {
    renderWithProviders(<CardWithLink {...props} />)

    const icon = screen.getByTestId('LanguageIcon')

    expect(icon).toBeInTheDocument()
  })

  it('should render icon with default color', () => {
    renderWithProviders(<CardWithLink {...props} iconColor='invalidColor' />)

    const icon = screen.getByTestId('LanguageIcon')

    expect(icon).toBeInTheDocument()
  })

  it('should render service title', () => {
    renderWithProviders(<CardWithLink {...props} />)

    const title = screen.getByText(props.title)

    expect(title).toBeInTheDocument()
  })

  it('should render tutors count', () => {
    renderWithProviders(<CardWithLink {...props} />)

    const count = screen.getByText(props.description)

    expect(count).toBeInTheDocument()
  })
})
