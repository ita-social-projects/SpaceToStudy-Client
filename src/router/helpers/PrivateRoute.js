import { Navigate } from 'react-router-dom'
import { errors } from '~/constants/routes'

const PrivateRoute = ({ role, children, userRole }) => {
  if (userRole !== role) {
    return <Navigate replace to={ errors.authPolicy.nested } />
  }

  return children
}

export default PrivateRoute
