import { render, fireEvent, screen } from '@testing-library/react'
import ShowMoreCollapse from '~/components/show-more-collapse/ShowMoreCollapse'

const collapsedTextLength = 50
const title = 'Test Title'

describe('ShowMoreCollapse component', () => {
  it('should render ShowMoreCollapse without showMore button', () => {
    const shortDescription = 'Short description.'

    render(
      <ShowMoreCollapse
        collapsedTextLength={collapsedTextLength}
        description={shortDescription}
        title={title}
      />
    )

    const titleText = screen.getByText(title)
    const descriptionText = screen.getByText(shortDescription)
    const showMore = screen.queryByText('common.showMore')

    expect(titleText).toBeInTheDocument()
    expect(descriptionText).toBeInTheDocument()
    expect(showMore).not.toBeInTheDocument()
  })

  it('should render ShowMoreCollapse with showMore button', () => {
    const fullDescription = 'Lorem ipsum dolor sit amet. '.repeat(20)
    const collapsedDescription = fullDescription.slice(0, collapsedTextLength)

    render(
      <ShowMoreCollapse
        collapsedTextLength={collapsedTextLength}
        description={fullDescription}
        title={title}
      />
    )

    const collapsedDescriptionText = screen.getByText(
      new RegExp(collapsedDescription.trim(), 'i')
    )
    const showMore = screen.queryByText('common.showMore')

    expect(collapsedDescriptionText).toBeInTheDocument()
    expect(showMore).toBeInTheDocument()

    fireEvent.click(showMore)

    const descriptionElement = screen.getByText(fullDescription.trim(), {
      exact: false
    })

    const showLess = screen.queryByText('common.showLess')
    expect(descriptionElement).toBeInTheDocument()
    expect(showLess).toBeInTheDocument()
  })
})
