import { useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '~/hooks/use-redux'

import { logout } from '~/redux/reducer'
import { useLogoutMutation } from '~/services/auth-service'
import { guestRoutes } from '~/router/constants/guestRoutes'

const Logout = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [logoutUser] = useLogoutMutation()

  const onLogoutUser = useCallback(async () => {
    await logoutUser()
    dispatch(logout())
    navigate(guestRoutes.home.route)
  }, [logoutUser, dispatch, navigate])

  useEffect(() => {
    void onLogoutUser()
  }, [onLogoutUser])

  return null
}

export default Logout
