import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import InfoIcon from '@mui/icons-material/Info'
import SellIcon from '@mui/icons-material/Sell'
import LeakAddIcon from '@mui/icons-material/LeakAdd'

export interface ProfileItemType {
  id: string
  icon: JSX.Element
}

export const profileItems: ProfileItemType[] = [
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
