import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import InfoIcon from '@mui/icons-material/Info'
import SellIcon from '@mui/icons-material/Sell'
import LeakAddIcon from '@mui/icons-material/LeakAdd'
import CategoryIcon from '@mui/icons-material/Category'

export interface ProfileItemType {
  id: string
  icon: JSX.Element
}

export const profileItemsTutor: ProfileItemType[] = [
  {
    id: 'photo',
    icon: <AccountCircleIcon />
  },
  {
    id: 'education',
    icon: <InfoIcon />
  },
  {
    id: 'schedule',
    icon: <SellIcon />
  },
  {
    id: 'offer',
    icon: <LeakAddIcon />
  }
]

export const profileItemsStudent: ProfileItemType[] = [
  {
    id: 'photo',
    icon: <AccountCircleIcon />
  },
  {
    id: 'category',
    icon: <CategoryIcon />
  },
  {
    id: 'schedule',
    icon: <SellIcon />
  },
  {
    id: 'offer',
    icon: <LeakAddIcon />
  }
]
