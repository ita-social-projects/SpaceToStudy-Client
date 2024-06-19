import { screen, render, fireEvent, waitFor } from '@testing-library/react'

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

describe('title-with-description component with tooltip', () => {
  const props = {
    title: 'Title for test case',
    description: 'Description for test case'
  }
  it('should show tooltip when isDescriptionTooltip is true', () => {
    render(<TitleWithDescription {...props} isDescriptionTooltip />)

    const descriptionElement = screen.getByText(props.description)

    fireEvent.mouseOver(descriptionElement)

    waitFor(() => {
      const tooltipContent = screen.getByRole('tooltip')
      expect(tooltipContent).toBeInTheDocument()
      expect(tooltipContent).toHaveTextContent(props.description)
    })
  })

  describe('title-with-description component with React component as description', () => {
    const props = {
      title: 'Title for test case',
      description: <div>React component description</div>
    }

    it('should render description as a div when description is a React component', () => {
      render(<TitleWithDescription {...props} />)
      const descriptionElement = screen.getByText('React component description')
      const parentElement = descriptionElement.parentElement

      expect(parentElement.tagName).toBe('DIV')
    })
  })
})
