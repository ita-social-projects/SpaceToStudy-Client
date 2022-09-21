import { useNavigate } from 'react-router-dom'

import Loader from '~/components/loader/Loader'
import { guestRoutes } from '~/router/constants/guestRoutes'
import GuestRoutes from '../routes/GuestRoutes'

const GuestRoute = ({ userRole }) => {
  const navigate = useNavigate()

  if (userRole) {
    setTimeout(() => {
      navigate(guestRoutes[userRole].route)
    }, 0)
  } else {
    return <GuestRoutes />
  }

  return <Loader size={ 70 } />
}

export default GuestRoute
