import { render, screen } from '@testing-library/react'
import InternalServerError from '~/pages/error/InternalServerError'

describe('InternalServerError page test', () => {
  beforeEach(() => {
    render(<InternalServerError />)
  })
  it('Should test if title is in the document', () => {
    const title = screen.getByText('errorPage.500.title')

    expect(title).toBeInTheDocument()
  })
  it('Should test if description is in the document', () => {
    const description = screen.getByText('errorPage.500.description')

    expect(description).toBeInTheDocument()
  })
  it('Should test if error logo is in the document', () => {
    const errorLogo = screen.getByAltText('errorLogo')

    expect(errorLogo).toBeInTheDocument()
  })
})
