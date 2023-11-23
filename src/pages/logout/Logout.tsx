import { useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { useLogoutMutation } from '~/services/auth-service'
import { guestRoutes } from '~/router/constants/guestRoutes'

const Logout = () => {
  const navigate = useNavigate()
  const [logoutUser] = useLogoutMutation()

  const onLogoutUser = useCallback(async () => {
    await logoutUser()
    navigate(guestRoutes.home.route)
  }, [logoutUser, navigate])

  useEffect(() => {
    void onLogoutUser()
  }, [onLogoutUser])

  return null
}

export default Logout
