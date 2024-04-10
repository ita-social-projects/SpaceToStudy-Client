import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import AdminHome from '~/pages/admin-home/AdminHome'

describe('AdminHome component', () => {
  beforeEach(() => {
    renderWithProviders(<AdminHome />)
  })

  it('Should render AdminHome placeholder', () => {
    expect(screen.getByText('Hello Admin!')).toBeInTheDocument()
  })
})
