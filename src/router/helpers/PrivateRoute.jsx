import { useSelector } from 'react-redux'
import { Navigate, Outlet, useOutletContext } from 'react-router-dom'
import { errorRoutes } from '~/router/constants/errorRoutes'

const PrivateRoute = ({ role }) => {
  const context = useOutletContext()
  const { userRole } = useSelector((state) => state.appMain)

  if (!userRole || !role.includes(userRole)) {
    return <Navigate replace to={errorRoutes.authPolicy.path} />
  }

  return <Outlet context={context} />
}

export default PrivateRoute
