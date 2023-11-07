import { render, screen } from '@testing-library/react'
import { describe } from 'vitest'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'

const description = 'errorMessages.tryAgainText'
const buttonText = 'errorMessages.buttonRequest'

describe('NotFoundResults', () => {
  it('renders NotFoundResults component', () => {
    render(
      <NotFoundResults buttonText={buttonText} description={description} />
    )

    const title = screen.getByText('errorMessages.resultsNotFound')
    const text = screen.getByText('errorMessages.tryAgainText')
    const button = screen.getByText('errorMessages.buttonRequest')

    expect(title).toBeInTheDocument()
    expect(text).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })
})
