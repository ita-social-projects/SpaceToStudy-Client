import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import GuestHomePage from '~/pages/guest-home-page/GuestHome'
import { guestRoutes } from '~/router/constants/guestRoutes'

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
