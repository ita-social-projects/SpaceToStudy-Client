import { Navigate } from 'react-router-dom'
import { errorRoutes } from '~/router/constants/errorRoutes'

const PrivateRoute = ({ role, children, userRole }) => {
  if (userRole !== role) {
    return <Navigate replace to={ errorRoutes.authPolicy.path } />
  }

  return children
}

export default PrivateRoute
