import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setUser } from '~/redux/reducer'
import { CircularProgress } from '@mui/material'
import Student from './Student'
import Guest from './Guest'
import Mentor from './Mentor'

const AppMain = () => {
  const { loading, userRole } = useSelector((state) => state.appMain)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setUser())
  }, [dispatch])

  if (loading) {
    return (
      <CircularProgress 
        color={ 'basic' } 
        size={ 70 } 
        sx={ { position: 'fixed', left: '50%', top: '50%' } }
      />)
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
