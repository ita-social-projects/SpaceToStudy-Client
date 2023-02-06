import { screen } from '@testing-library/react'
import InternalServerError from '~/pages/error/InternalServerError'
import { renderWithProviders } from '~tests/test-utils'

describe('InternalServerError page test', () => {
  beforeEach(() => {
    renderWithProviders(<InternalServerError />)
  })
  it('should render title', () => {
    const title = screen.getByText('errorPage.500.title')

    expect(title).toBeInTheDocument()
  })
  it('should render description', () => {
    const description = screen.getByText('errorPage.500.description')

    expect(description).toBeInTheDocument()
  })
  it('should render error logo', () => {
    const errorLogo = screen.getByAltText('errorLogo')

    expect(errorLogo).toBeInTheDocument()
  })
})
