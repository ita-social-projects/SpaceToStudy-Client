import { render, screen } from '@testing-library/react'
import { describe } from 'vitest'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'

const description = 'constant.tryAgainText'
const buttonText = 'constant.buttonRequest'

describe('NotFoundResults', () => {
  it('renders NotFoundResults component', () => {
    render(
      <NotFoundResults buttonText={buttonText} description={description} />
    )

    const title = screen.getByText('constant.resultsNotFound')
    const text = screen.getByText('constant.tryAgainText')
    const button = screen.getByText('constant.buttonRequest')

    expect(title).toBeInTheDocument()
    expect(text).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })
})
