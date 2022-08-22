import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import AuthPolicy from '~/pages/error/AuthPolicy'

describe('AuthPolicy component', () => {
  beforeEach(() => {
    renderWithProviders(<AuthPolicy />)
  })

  it('should render title', () => {
    const title = screen.getByText(/errorPage.401.title/)

    expect(title).toBeInTheDocument()
  })

  it('should render description', () => {
    const description = screen.getByText(/errorPage.401.description/)

    expect(description).toBeInTheDocument()
  })

  it('should render button', () => {
    const button = screen.getByText(/button.toMain/)

    expect(button).toBeInTheDocument()
  })

  it('should render image', () => {
    const img = screen.getByAltText(/Authorization error/)

    expect(img).toBeInTheDocument()
  })
})
