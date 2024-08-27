import { authRoutes } from '~/router/constants/authRoutes'
import { guestRoutes } from '~/router/constants/guestRoutes'

export const studentRoutes = {
  navBar: {
    homePage: { route: 'homePage', path: guestRoutes.student.path },
    findOffers: {
      route: 'findTutor',
      path: authRoutes.findOffers.path
    },
    cooperations: {
      route: 'cooperations',
      path: authRoutes.myCooperations.path
    }
  }
}
