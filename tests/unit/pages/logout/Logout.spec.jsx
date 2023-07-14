import { render, waitFor } from '@testing-library/react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Logout from '~/pages/logout/Logout'
import { guestRoutes } from '~/router/constants/guestRoutes'

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn()
}))

vi.mock('react-redux', () => ({
  useDispatch: vi.fn()
}))

const dispatch = vi.fn()
useDispatch.mockReturnValue(dispatch)
const navigate = vi.fn()
useNavigate.mockReturnValue(navigate)

describe('Logout', () => {
  it('dispatches logoutUser action and redirects to home route', async () => {
    render(<Logout />)
    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledTimes(1)
      expect(navigate).toHaveBeenCalledTimes(1)
      expect(navigate).toHaveBeenCalledWith(guestRoutes.home.route)
    })
  })
})
