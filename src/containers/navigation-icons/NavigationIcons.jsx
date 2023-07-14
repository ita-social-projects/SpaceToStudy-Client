import { useSelector } from 'react-redux'

import GuestIcons from '~/containers/navigation-icons/guest-icons/GuestIcons'
import UserIcons from '~/containers/navigation-icons/user-icons/UserIcons'

const NavigationIcons = ({ setSidebarOpen }) => {
  const { userRole } = useSelector((state) => state.appMain)

  if (!userRole) return <GuestIcons setSidebarOpen={setSidebarOpen} />

  return <UserIcons setSidebarOpen={setSidebarOpen} />
}

export default NavigationIcons
