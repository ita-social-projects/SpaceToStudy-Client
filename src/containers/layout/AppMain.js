import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '~/redux/reducer'

import Student from './Student'
import Guest from './Guest'
import Mentor from './Mentor'
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
    return <Student />
  case 'mentor':
    return <Mentor />
  default:
    return <Guest />
  }
}

export default AppMain
