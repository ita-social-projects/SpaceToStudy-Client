import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import Logout from '~/pages/logout/Logout'
import { vi } from 'vitest'

const mockDispatch = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => vi.fn()
  }
})

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux')
  return {
    ...actual,
    useDispatch: () => mockDispatch.mockReturnValue({ unwrap: () => '' })
  }
})

describe('Logout page', () => {
  beforeEach(() => {
    renderWithProviders(<Logout />)
  })

  it('should render lo', () => {
    const loader = screen.getByTestId('loader')

    expect(loader).toBeInTheDocument()
  })
})
