import { Suspense, useLayoutEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'
import Loader from '~/components/loader/Loader'
import { checkAuth } from '~/redux/reducer'

const AppMain = () => {
  const { authLoading } = useAppSelector((state) => state.appMain)
  const dispatch = useAppDispatch()

  useLayoutEffect(() => {
    void dispatch(checkAuth())
  }, [dispatch])

  if (authLoading) {
    return <Loader pageLoad size={70} />
  }

  return (
    <Suspense fallback={<Loader pageLoad size={70} />}>
      <Outlet />
    </Suspense>
  )
}

export default AppMain
