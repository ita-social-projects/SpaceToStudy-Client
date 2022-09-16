import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Loader from '~/components/loader/Loader'
import { logoutUser } from '~/redux/reducer'
import { routes } from '~/constants/routes'

const Logout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(logoutUser()).unwrap()
    navigate(routes.home.route)
  }, [dispatch, navigate])

  return <Loader size={ 70 } />
}

export default Logout
