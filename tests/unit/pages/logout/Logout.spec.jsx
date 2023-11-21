import { render, waitFor } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '~/hooks/use-redux'
import { guestRoutes } from '~/router/constants/guestRoutes'
import Logout from '~/pages/logout/Logout'

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn()
}))

vi.mock('~/hooks/use-redux', () => ({
  useAppDispatch: vi.fn()
}))

const logout = vi.fn().mockReturnValue({})

vi.mock('~/services/auth-service', async () => {
  const actual = await vi.importActual('~/services/auth-service')
  return {
    ...actual,
    useLogoutMutation: () => [logout]
  }
})

const dispatch = vi.fn()
useAppDispatch.mockReturnValue(dispatch)
const navigate = vi.fn()
useNavigate.mockReturnValue(navigate)

describe('Logout', () => {
  it('dispatches logoutUser action and redirects to home route', async () => {
    render(<Logout />)
    await waitFor(() => {
      expect(logout).toHaveBeenCalledTimes(1)
      expect(dispatch).toHaveBeenCalledTimes(1)
      expect(navigate).toHaveBeenCalledTimes(1)
      expect(navigate).toHaveBeenCalledWith(guestRoutes.home.route)
    })
  })
})
