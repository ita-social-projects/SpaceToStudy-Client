import { screen } from '@testing-library/react'
import NotFound from '~/pages/error/NotFound'
import { renderWithProviders } from '~tests/test-utils'

describe('InternalServerError page test', () => {
  beforeEach(() => {
    renderWithProviders(<NotFound />)
  })

  it('should render title', () => {
    const title = screen.getByText('errorPage.404.title')

    expect(title).toBeInTheDocument()
  })

  it('should render description', () => {
    const description = screen.getByText('errorPage.404.description')

    expect(description).toBeInTheDocument()
  })

  it('should render error logo', () => {
    const errorLogo = screen.getByAltText('flowerpot')

    expect(errorLogo).toBeInTheDocument()
  })
})
