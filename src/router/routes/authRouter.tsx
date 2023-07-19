import { lazy } from 'react'
import { Route } from 'react-router-dom'

import PrivateRoute from '~/router/helpers/PrivateRoute'
import {
  subjects,
  findOffers,
  categories,
  offerDetails,
  userProfile,
  chat,
  myCooperations,
  myOffers,
  myResources,
  editProfile,
  myProfile
} from '~/router/constants/crumbs'
import { authRoutes } from '~/router/constants/authRoutes'
import { UserRoleEnum } from '~/types'
import { userProfileLoader } from '../constants/loaders'

const MyCooperations = lazy(
  () => import('~/pages/my-cooperations/MyCooperations')
)
const EditProfile = lazy(() => import('~/pages/edit-profile/EditProfile'))
const MyOffers = lazy(() => import('~/pages/my-offers/MyOffers'))
const MyResources = lazy(() => import('~/pages/my-resources/MyResources'))
const Chat = lazy(() => import('~/pages/chat/Chat'))
const Subjects = lazy(() => import('~/pages/subjects/Subjects'))
const Categories = lazy(() => import('~/pages/categories/Categories'))
const FindOffers = lazy(() => import('~/pages/find-offers/FindOffers'))
const OfferDetails = lazy(() => import('~/pages/offer-details/OfferDetails'))
const TutorProfile = lazy(() => import('~/pages/tutor-profile/TutorProfile'))

export const authRouter = (
  <Route
    element={<PrivateRoute role={[UserRoleEnum.Student, UserRoleEnum.Tutor]} />}
  >
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
      element={<Chat />}
      handle={{ crumb: chat }}
      path={authRoutes.chat.route}
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
    <Route
      element={<MyResources />}
      handle={{ crumb: myResources }}
      path={authRoutes.myResources.route}
    />
  </Route>
)
