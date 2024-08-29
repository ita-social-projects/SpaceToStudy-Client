import { authRoutes } from '~/router/constants/authRoutes'
import { guestRoutes } from '~/router/constants/guestRoutes'

export const findOffersChildRoutes = [
  { route: 'categories', path: authRoutes.categories.path },
  { route: 'subjects', path: authRoutes.subjects.path },
  { route: 'allOffers', path: authRoutes.findOffers.path }
]

export const tutorRoutes = {
  navBar: {
    homePage: {
      route: 'homePage',
      path: guestRoutes.tutor.path
    },
    findOffers: {
      route: 'findStudent',
      path: authRoutes.findOffers.path
    },
    cooperations: {
      route: 'cooperations',
      path: authRoutes.cooperationDetails.path
    }
  }
}
