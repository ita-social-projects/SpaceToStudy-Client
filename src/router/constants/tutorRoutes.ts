import { authRoutes } from '~/router/constants/authRoutes'

export const findOffersChildRoutes = [
  { route: 'categories', path: authRoutes.categories.path },
  { route: 'subjects', path: authRoutes.subjects.path },
  { route: 'allOffers', path: authRoutes.findOffers.path }
]

export const tutorRoutes = {
  navBar: {
    findOffers: {
      route: 'findOffers',
      path: authRoutes.findOffers.path
    },
    myResources: {
      route: 'my-resources',
      path: authRoutes.myResources.root.path
    },
    myCourses: {
      route: 'my-courses',
      path: authRoutes.myCourses.root.path
    }
  }
}
