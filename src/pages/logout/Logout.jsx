import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { logoutUser } from '~/redux/reducer'
import { guestRoutes } from '~/router/constants/guestRoutes'

const Logout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    void dispatch(logoutUser())
    navigate(guestRoutes.home.route)
  }, [dispatch, navigate])

  return null
}

export default Logout
