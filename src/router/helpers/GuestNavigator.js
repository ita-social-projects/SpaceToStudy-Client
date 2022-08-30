import { Navigate, useLocation } from 'react-router-dom'

import GuestHomePage from '~/pages/guest-home-page/GuestHome'
import { errors } from '~/constants/routes'

export const GuestNavigator = () => {
  const location = useLocation()

  if (location.state?.role) {
    return <Navigate to={ errors.authPolicy.route } />
  }

  return <GuestHomePage />
}
