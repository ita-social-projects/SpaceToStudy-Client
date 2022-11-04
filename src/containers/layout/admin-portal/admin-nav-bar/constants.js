import { adminRoutes } from '~/router/constants/adminRoutes'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import CategoryIcon from '@mui/icons-material/Category'
import ArticleIcon from '@mui/icons-material/Article'

export const navBarItems = [
  {
    icon: <AccountCircleIcon />,
    label: 'Roles',
    childrens: [
      { subLabel: 'Admins', path: adminRoutes.admins.route },
      { subLabel: 'Tutors', path: adminRoutes.tutors.route },
      { subLabel: 'Students', path: adminRoutes.students.route }
    ]
  },
  {
    icon: <CategoryIcon />,
    label: 'Categories',
    path: adminRoutes.categories.route,
    childrens: []
  },
  {
    icon: <ArticleIcon />,
    label: 'Complains',
    path: adminRoutes.complains.route,
    childrens: []
  }
]
