import { render, screen } from '@testing-library/react'
import { describe } from 'vitest'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'

const description = 'constant.tryAgainText'
const buttonName = 'constant.buttonRequest'

describe('NotFoundResults', () => {
  test('renders NotFoundResults component', () => {
    render(
      <NotFoundResults buttonName={buttonName} description={description} />
    )

    const title = screen.getByText('constant.resultsNotFound')
    const text = screen.getByText('constant.tryAgainText')
    const button = screen.getByText('constant.buttonRequest')

    expect(title).toBeInTheDocument()
    expect(text).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })
})
