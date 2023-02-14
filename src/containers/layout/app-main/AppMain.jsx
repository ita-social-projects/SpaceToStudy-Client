import { Suspense, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

import Loader from '~/components/loader/Loader'
import { checkAuth } from '~/redux/reducer'

const AppMain = () => {
  const { isCheckAuthLoading } = useSelector((state) => state.appMain)
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  if (isCheckAuthLoading) {
    return <Loader pageLoad size={ 70 } />
  }

  return (
    <Suspense fallback={ <Loader pageLoad size={ 70 } /> }>
      <Outlet />
    </Suspense>
  )
}

export default AppMain
