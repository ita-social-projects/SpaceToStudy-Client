import { lazy, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '~/hooks/use-redux'

import { guestRoutes } from '~/router/constants/guestRoutes'

const GuestHomePage = lazy(() => import('~/pages/guest-home-page/GuestHome'))

const HomeRoute = () => {
  const navigate = useNavigate()
  const { userRole } = useAppSelector((state) => state.appMain)

  useEffect(() => {
    if (userRole) {
      navigate(guestRoutes[userRole].route)
    }
  }, [navigate, userRole])

  return <GuestHomePage />
}

export default HomeRoute
