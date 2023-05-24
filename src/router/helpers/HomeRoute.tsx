import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '~/hooks/use-redux'
import GuestHomePage from '~/pages/guest-home-page/GuestHome'
import { guestRoutes } from '~/router/constants/guestRoutes'

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
