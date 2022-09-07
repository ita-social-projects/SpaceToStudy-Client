import { useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '~/components/loader/Loader'
import { checkAuth } from '~/redux/reducer'
import AppRouter from '~/router/AppRouter'

const AppMain = () => {
  const { loading, userRole } = useSelector((state) => state.appMain)
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  if (loading) {
    return <Loader size={ 70 } />
  }

  return <AppRouter userRole={ userRole } />
}

export default AppMain
