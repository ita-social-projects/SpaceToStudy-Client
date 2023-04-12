import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { errorRoutes } from '~/router/constants/errorRoutes'

const PrivateRoute = ({ role, children }) => {
  const { userRole } = useSelector((state) => state.appMain)

  if (userRole !== role) {
    return <Navigate replace to={errorRoutes.authPolicy.path} />
  }

  return children ? children : <Outlet />
}

export default PrivateRoute
