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

  const pathto = state?.pathname || to

  useEffect(() => {
    setTimeout(() => {
      if (!isAuth && pathto !== routes.home.route && state) {
        navigate(errors.authPolicy.route)
      } else {
        navigate(pathto, {
          state: {
            role,
            pathname
          }
        })
      }
    }, 0)
  }, [navigate, pathto, role, isAuth, state, pathname])

  return <Loader size={ 70 } />
}
