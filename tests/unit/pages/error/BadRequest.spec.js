import { screen } from '@testing-library/react'
import BadRequest from '~/pages/error/BadRequest'
import { renderWithProviders } from '~tests/test-utils'

describe('BadRequest error page test', () => {
  beforeEach(() => {
    renderWithProviders(<BadRequest />)
  })
  it('should render title', () => {
    const title = screen.getByText('errorPage.400.title')

    expect(title).toBeInTheDocument()
  })
  it('should render description', () => {
    const description = screen.getByText('errorPage.400.description')

    expect(description).toBeInTheDocument()
  })
  it('should render error logo', () => {
    const errorLogo = screen.getByAltText('man')

    expect(errorLogo).toBeInTheDocument()
  })
})
