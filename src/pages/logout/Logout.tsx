import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '~/hooks/use-redux'

import { logoutUser } from '~/redux/reducer'
import { guestRoutes } from '~/router/constants/guestRoutes'

const Logout = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    void dispatch(logoutUser())
    navigate(guestRoutes.home.route)
  }, [dispatch, navigate])

  return null
}

export default Logout
