import { FC } from 'react'
import {
  Navigate,
  Outlet,
  useLocation,
  useOutletContext
} from 'react-router-dom'
import { useAppSelector } from '~/hooks/use-redux'
import { errorRoutes } from '~/router/constants/errorRoutes'
import { UserRole } from '~/types'

interface PrivateRouteProps {
  role: UserRole[]
}

const PrivateRoute: FC<PrivateRouteProps> = ({ role }) => {
  const context = useOutletContext()
  const { userRole } = useAppSelector((state) => state.appMain)

  const { pathname, search } = useLocation()

  if (!userRole || !role.includes(userRole)) {
    return (
      <Navigate
        replace
        state={{ prevPage: pathname + search }}
        to={errorRoutes.authPolicy.path}
      />
    )
  }

  return <Outlet context={context} />
}

export default PrivateRoute
