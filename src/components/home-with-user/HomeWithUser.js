/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import { roles } from '~/constants/common'

const HomeWithUserRole = (HomePage) => (props) => {
  const { user } = useSelector((store) => store.User)

  if (user && user.role === roles.student) {
    return <Navigate to="/student" />
  }
  if (user && user.role === roles.mentor) {
    return <Navigate to="/mentor" />
  }

  return <HomePage { ...props } />
}

export default HomeWithUserRole
