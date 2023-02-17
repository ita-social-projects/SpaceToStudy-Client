import { screen, render } from '@testing-library/react'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

describe('title-with-description component', () => {
  const props = {
    title: 'Title for test case',
    description: 'Description for test case'
  }

  beforeEach(() => {
    render(<TitleWithDescription {...props} />)
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
