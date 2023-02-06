import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import Logout from '~/pages/logout/Logout'

describe('Logout page', () => {
  beforeEach(() => {
    renderWithProviders(<Logout />)
  })

  it('should render lo', () => {
    const loader = screen.getByTestId('loader')

    expect(loader).toBeInTheDocument()
  })
})
