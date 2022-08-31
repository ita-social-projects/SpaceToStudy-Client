import { Navigate } from 'react-router-dom'
import { errors } from '~/constants/routes'

export const PrivateRoute = ({ role, children, userRole }) => {
  if (userRole !== role) {
    return <Navigate replace to={ errors.authPolicy.route } />
  }

  return children
}
