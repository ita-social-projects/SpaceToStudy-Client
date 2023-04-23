import { lazy, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { guestRoutes } from '~/router/constants/guestRoutes'

const GuestHomePage = lazy(() => import('~/pages/guest-home-page/GuestHome'))

const HomeRoute = () => {
  const navigate = useNavigate()
  const { userRole } = useSelector((state) => state.appMain)

  useEffect(() => {
    if (userRole) {
      navigate(guestRoutes[userRole].route)
    }
  }, [navigate, userRole])

  return <GuestHomePage />
}

export default HomeRoute
