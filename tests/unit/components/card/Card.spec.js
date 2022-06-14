import { screen, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import Card from '~/components/card/Card'

describe('Card component', () => {
  const props =
  {
    id: 1,
    img: 'learnImg.svg',
    title: 'Learn from experts',
    description: 'It is a long established fact that a reader...',
    btnText: 'Start learning today',
    link: '#'
  }

  beforeEach(() => {
    render(
      <MemoryRouter>
        <Card  { ...props } />
      </MemoryRouter>)
  })

  it('should contain image', () => {
    const img = screen.getByRole('img')

    expect(img).toBeInTheDocument()
  })

  it('should have correct title', () => {
    const text = screen.getByText(props.title)

    expect(text).toBeInTheDocument()
  })

  it('should have correct description', () => {
    const text = screen.getByText(props.description)

    expect(text).toBeInTheDocument()
  })

  it('should have correct button text', () => {
    const text = screen.getByText(props.btnText)

    expect(text).toBeInTheDocument()
  })
})
