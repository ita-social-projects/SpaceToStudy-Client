import { screen, render } from '@testing-library/react'

import Heading from '~/components/heading/Heading'

describe('Heading component', () => {
  const props = {
    title: 'Title for test case',
    description: 'Description for test case'
  }

  beforeEach(() => {
    render(<Heading { ...props } />)
  })

  it('should have correct title', () => {
    const title = screen.getByText(props.title)

    expect(title).toBeInTheDocument()
  })

  it('should have correct description', () => {
    const description = screen.getByText(props.description)

    expect(description).toBeInTheDocument()
  })
})
