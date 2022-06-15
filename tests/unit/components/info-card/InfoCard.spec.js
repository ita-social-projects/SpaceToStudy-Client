import { screen, render } from '@testing-library/react'

import InfoCard from '~/components/info-card/InfoCard'

describe('InfoCard component', () => {
  const props =
  {
    id: 1,
    img: 'learnImg.svg',
    title: 'Learn from experts',
    description: 'It is a long established fact that a reader...',
    btnText: 'Start learning today',
  }

  beforeEach(() => {
    render(<InfoCard  { ...props } />)
  })

  it('should contain image', () => {
    const img = screen.getByTestId('img')

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
