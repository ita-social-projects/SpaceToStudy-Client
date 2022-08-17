import { useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import StudentLayout from './StudentLayout'
import GuestLayout from './GuestLayout'
import MentorLayout from './MentorLayout'
import Loader from '~/components/loader/Loader'
import { checkAuth } from '~/redux/reducer'
import { getFromLocalStorage } from '~/services/local-storage-service'
import { accessToken } from '~/constants'

const AppMain = () => {
  const { loading, userRole } = useSelector((state) => state.appMain)
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    if (getFromLocalStorage(accessToken)) {
      dispatch(checkAuth())
    }
  }, [dispatch])

  if (loading) {
    return <Loader size={ 70 } />
  }

  switch (userRole) {
  case 'student':
    return <StudentLayout />
  case 'mentor':
    return <MentorLayout />
  default:
    return <GuestLayout />
  }
}

export default AppMain
