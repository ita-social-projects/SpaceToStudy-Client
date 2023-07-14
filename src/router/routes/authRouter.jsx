import { lazy } from 'react'
import { Route } from 'react-router-dom'

import { student, tutor } from '~/constants'
import { authRoutes } from '~/router/constants/authRoutes'
import {
  categories,
  editProfile,
  findOffers,
  myCooperations,
  myOffers,
  myProfile,
  offerDetails,
  subjects,
  userProfile
} from '~/router/constants/crumbs'
import PrivateRoute from '~/router/helpers/PrivateRoute'
import { userProfileLoader } from '../constants/loaders'

const MyCooperations = lazy(() =>
  import('~/pages/my-cooperations/MyCooperations')
)
const EditProfile = lazy(() => import('~/pages/edit-profile/EditProfile'))
const MyOffers = lazy(() => import('~/pages/my-offers/MyOffers'))
const Subjects = lazy(() => import('~/pages/subjects/Subjects'))
const Categories = lazy(() => import('~/pages/categories/Categories'))
const FindOffers = lazy(() => import('~/pages/find-offers/FindOffers'))
const TutorProfile = lazy(() => import('~/pages/tutor-profile/TutorProfile'))
const OfferDetails = lazy(() => import('~/pages/offer-details/OfferDetails'))

export const authRouter = (
  <Route element={<PrivateRoute role={[student, tutor]} />}>
    <Route
      element={<Categories />}
      handle={{ crumb: categories }}
      path={authRoutes.categories.route}
    />
    <Route
      element={<Subjects />}
      handle={{ crumb: [categories, subjects] }}
      path={authRoutes.subjects.route}
    />
    <Route
      element={<FindOffers />}
      handle={{ crumb: [categories, subjects, findOffers] }}
      path={authRoutes.findOffers.route}
    />
    <Route
      element={<OfferDetails />}
      handle={{ crumb: [categories, subjects, findOffers, offerDetails] }}
      path={authRoutes.offerDetails.route}
    />
    <Route
      element={<TutorProfile />}
      handle={{ crumb: userProfile }}
      loader={userProfileLoader}
      path={authRoutes.userProfile.route}
    />
    <Route
      element={<TutorProfile />}
      handle={{ crumb: myProfile }}
      path={authRoutes.accountMenu.myProfile.route}
    />
    <Route
      element={<MyCooperations />}
      handle={{ crumb: myCooperations }}
      path={authRoutes.accountMenu.myCooperations.route}
    />
    <Route
      element={<EditProfile />}
      handle={{ crumb: [myProfile, editProfile] }}
      path={authRoutes.editProfile.route}
    />
    <Route
      element={<MyOffers />}
      handle={{ crumb: myOffers }}
      path={authRoutes.accountMenu.myOffers.route}
    />
  </Route>
)
