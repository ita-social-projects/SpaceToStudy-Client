import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import InfoIcon from '@mui/icons-material/Info'
import SellIcon from '@mui/icons-material/Sell'
import LeakAddIcon from '@mui/icons-material/LeakAdd'
import CategoryIcon from '@mui/icons-material/Category'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded'
import { authRoutes } from '~/router/constants/authRoutes'

export interface ProfileItemType {
  id: string
  icon: JSX.Element
  path: string
}

export const profileItemsTutor: ProfileItemType[] = [
  {
    id: 'photo',
    icon: <AccountCircleIcon />,
    path: authRoutes.editProfile.path
  },
  {
    id: 'education',
    icon: <InfoIcon />,
    path: `${authRoutes.editProfile.path}?tab=professionalInfo`
  },
  {
    id: 'video',
    icon: <VideocamRoundedIcon />,
    path: authRoutes.editProfile.path
  },
  {
    id: 'schedule',
    icon: <SellIcon />,
    path: ''
  },
  {
    id: 'offer',
    icon: <LeakAddIcon />,
    path: authRoutes.myProfile.path
  }
]

export const profileItemsStudent: ProfileItemType[] = [
  {
    id: 'photo',
    icon: <AccountCircleIcon />,
    path: authRoutes.editProfile.path
  },
  {
    id: 'category',
    icon: <CategoryIcon />,
    path: `${authRoutes.editProfile.path}?tab=professionalInfo`
  },
  {
    id: 'address',
    icon: <LocationOnIcon />,
    path: authRoutes.editProfile.path
  },
  {
    id: 'offer',
    icon: <LeakAddIcon />,
    path: authRoutes.myProfile.path
  }
]

export const fieldsWithIncreasedHeight = ['#video', '#address']
