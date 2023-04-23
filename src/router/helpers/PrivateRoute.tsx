import { FC } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { errorRoutes } from '~/router/constants/errorRoutes'
import { UserRole } from '~/types'

interface PrivateRouteProps {
  role: UserRole[]
}

const PrivateRoute: FC<PrivateRouteProps> = ({ role }) => {
  const { userRole } = useSelector((state) => state.appMain)

  if (!role.includes(userRole)) {
    return <Navigate replace to={errorRoutes.authPolicy.path} />
  }

  return <Outlet />
}

export default PrivateRoute
