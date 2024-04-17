import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '~/hooks/use-redux'
import GuestHomePage from '~/pages/guest-home-page/GuestHome'
import { guestRoutes } from '~/router/constants/guestRoutes'

const HomeRoute = () => {
  const navigate = useNavigate()
  const { userRole } = useAppSelector((state) => state.appMain)
  const wasNavigateTriggeredRef = useRef(false)

  useEffect(() => {
    if (userRole && !wasNavigateTriggeredRef.current) {
      wasNavigateTriggeredRef.current = true
      navigate(guestRoutes[userRole].route)
    }
  }, [navigate, userRole])

  return <GuestHomePage />
}

export default HomeRoute
