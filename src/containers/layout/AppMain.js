import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '~/redux/reducer'

import StudentLayout from './StudentLayout'
import GuestLayout from './GuestLayout'
import MentorLayout from './MentorLayout'
import Loader from '~/components/loader/Loader'

const AppMain = () => {
  const { loading, userRole } = useSelector((state) => state.appMain)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setUser())
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
