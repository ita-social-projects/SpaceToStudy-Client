import { useNavigate } from 'react-router-dom'

import Loader from '~/components/loader/Loader'
import { routes } from '~/constants/routes'
import GuestRoutes from '../routes/GuestRoutes'

const GuestRoute = ({ userRole }) => {
  const navigate = useNavigate()

  if (userRole) {
    setTimeout(() => {
      navigate(routes[userRole].route)
    }, 0)
  } else {
    return <GuestRoutes />
  }

  return <Loader size={ 70 } />
}

export default GuestRoute
