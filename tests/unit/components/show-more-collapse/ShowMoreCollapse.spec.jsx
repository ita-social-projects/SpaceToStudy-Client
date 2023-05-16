import { render, fireEvent, screen } from '@testing-library/react'

import ShowMoreCollapse from '~/components/show-more-collapse/ShowMoreCollapse'

const collapsedTextLength = 50
const title = 'Test Title'
const description = 'Lorem ipsum dolor sit amet.'

describe('ShowMoreCollapse component', () => {
  it('should render ShowMoreCollapse without showMore button', () => {
    render(
      <ShowMoreCollapse
        collapsedTextLength={collapsedTextLength}
        description={description}
        title={title}
      />
    )

    const titleText = screen.getByText(title)
    const descriptionText = screen.getByText(description)
    const showMore = screen.queryByText('common.showMore')

    expect(titleText).toBeInTheDocument()
    expect(descriptionText).toBeInTheDocument()
    expect(showMore).not.toBeInTheDocument()
  })

  it('should render ShowMoreCollapse with showMore button', () => {
    const fullDescription = description.repeat(5)
    const collapsedDescription = fullDescription.slice(0, collapsedTextLength)

    render(
      <ShowMoreCollapse
        collapsedTextLength={collapsedTextLength}
        description={description.repeat(5)}
        title={title}
      />
    )

    const collapsedDescriptionText = screen.getByText(collapsedDescription)
    const showMore = screen.queryByText('common.showMore')

    expect(collapsedDescriptionText).toBeInTheDocument()

    fireEvent.click(showMore)

    const fullDescriptionText = screen.getByText(fullDescription)
    const showLess = screen.queryByText('common.showLess')

    expect(fullDescriptionText).toBeInTheDocument()
    expect(showLess).toBeInTheDocument()
  })
})
