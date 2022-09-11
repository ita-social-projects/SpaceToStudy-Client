import { Navigate } from 'react-router-dom'
import { errorsRoutes } from '~/router/constants/errorsRoutes'

const PrivateRoute = ({ role, children, userRole }) => {
  if (userRole !== role) {
    return <Navigate replace to={ errorsRoutes.authPolicy.path } />
  }

  return children
}

export default PrivateRoute
