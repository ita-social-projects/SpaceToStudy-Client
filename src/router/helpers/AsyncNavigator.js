import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import Loader from '~/components/loader/Loader'
import { errors, routes } from '~/constants/routes'

export const AsyncNavigator = ({ to, role }) => {
  const navigate = useNavigate()
  const { pathname, state } = useLocation()
  const { userRole } = useSelector((state) => state.appMain)

  const isAuth = state?.role === userRole

  if (pathname !== routes.home.route && pathname !== routes.mentor.route && pathname !== routes.student.route) {
    to = pathname
  }

  useEffect(() => {
    setTimeout(() => {
      if (!isAuth && to !== routes.home.route && state) {
        navigate(errors.authPolicy.route)
      } else {
        navigate(to, {
          state: {
            role
          }
        })
      }
    }, 0)
  }, [navigate, to, role, isAuth, state])

  return <Loader size={ 70 } />
}
