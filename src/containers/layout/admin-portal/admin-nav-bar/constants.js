import { adminRoutes } from '~/router/constants/adminRoutes'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import CategoryIcon from '@mui/icons-material/Category'
import ArticleIcon from '@mui/icons-material/Article'

export const navBarItems = [
  {
    icon: <AccountCircleIcon />,
    label: 'roles',
    children: [
      { subLabel: 'admins', path: adminRoutes.admins.route },
      { subLabel: 'tutors', path: adminRoutes.tutors.route },
      { subLabel: 'students', path: adminRoutes.students.route }
    ]
  },
  {
    icon: <CategoryIcon />,
    label: 'categories',
    path: adminRoutes.categories.route,
    children: []
  },
  {
    icon: <ArticleIcon />,
    label: 'complains',
    path: adminRoutes.complains.route,
    children: []
  }
]

export const initialExpandSubItems = {
  roles: false
}
