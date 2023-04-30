import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '~/hooks/use-redux'
import { errorRoutes } from '~/router/constants/errorRoutes'
import { UserRole } from '~/types'

interface PrivateRouteProps {
  role: UserRole[]
}

const PrivateRoute: FC<PrivateRouteProps> = ({ role }) => {
  const { userRole } = useAppSelector((state) => state.appMain)

  if (!userRole || !role.includes(userRole)) {
    return <Navigate replace to={errorRoutes.authPolicy.path} />
  }

  return <Outlet />
}

export default PrivateRoute
