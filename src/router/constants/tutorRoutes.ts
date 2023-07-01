import { authRoutes } from '~/router/constants/authRoutes'

export const tutorRoutes = {
  navBar: {
    categories: { route: 'categories', path: authRoutes.categories.path },
    subjects: { route: 'subjects', path: authRoutes.subjects.path },
    findOffers: { route: 'findOffers', path: authRoutes.findOffers.path }
  },
  accountMenu: {
    myProfile: { route: 'my-profile', path: '/tutor/my-profile' },
    myCooperations: {
      route: 'my-cooperations',
      path: '/tutor/my-cooperations'
    },
    myOffers: {
      route: 'my-offers',
      path: '/tutor/my-offers'
    },
    myLessons: {
      route: 'my-lessons',
      path: '/tutor/my-lessons'
    },
    logout: { route: 'logout', path: '/logout' }
  },
  editProfile: {
    route: 'my-profile/edit',
    path: '/tutor/my-profile/edit'
  }
}
