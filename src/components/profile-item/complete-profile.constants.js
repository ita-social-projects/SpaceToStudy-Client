import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import InfoIcon from '@mui/icons-material/Info'
import SellIcon from '@mui/icons-material/Sell'
import LeakAddIcon from '@mui/icons-material/LeakAdd'

export const profileItems = [
  {
    name: 'photo',
    icon: <AccountCircleIcon />,
    title: 'Set a profile picture',
    subtitle: 'Your photo will make it easier for members to recognize you.'
  },
  {
    name: 'education',
    icon: <InfoIcon />,
    title: 'Tell us about your professional experience',
    subtitle: 'Fill in your education and qualification details.'
  },
  {
    name: 'schedule',
    icon: <SellIcon />,
    title: 'Set up your working hours',
    subtitle: 'Create yourself a suitable working schedule. '
  },
  {
    name: 'offer',
    icon: <LeakAddIcon />,
    title: 'Create a new offer ',
    subtitle: 'Сreate an offer to find students for a subject you want to tutor.'
  }
]

export const labelsValue = [0, 20, 40, 60, 80, 100]
