import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import ClickableCard from '~/components/clickable-card/ClickableCard'

const props = {
  id: '1',
  img: 'icon.png',
  description: 234,
  title: 'Languages',
  link: '#'
}

describe('ClickableCard component', () => {
  beforeEach(()=>{
    renderWithProviders(<ClickableCard { ...props } />)
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
    const count = screen.getByText(props.description)

    expect(count).toBeInTheDocument()
  })
})
