import { lazy } from 'react'
import { Route } from 'react-router-dom'

import { authRoutes } from '~/router/constants/authRoutes'
import {
  categories,
  editProfile,
  findOffers,
  myCooperations,
  cooperationDetails,
  editLesson,
  lessonDetails,
  myProfile,
  myResources,
  myCourses,
  newLesson,
  offerDetails,
  subjects,
  userProfile,
  newQuiz,
  newQuestion,
  newCourse,
  editQuiz,
  editQuestion,
  editCourse,
  cooperationQuiz,
  bookmarkedOffers
} from '~/router/constants/crumbs'
import PrivateRoute from '~/router/helpers/PrivateRoute'
import { UserRoleEnum } from '~/types'
import { userProfileLoader } from '../constants/loaders'

const MyCooperations = lazy(
  () => import('~/pages/my-cooperations/MyCooperations')
)
const CooperationDetails = lazy(
  () =>
    import(
      '~/containers/my-cooperations/cooperation-details/CooperationDetails'
    )
)
const EditProfile = lazy(() => import('~/pages/edit-profile/EditProfile'))
const Chat = lazy(() => import('~/pages/chat/Chat'))
const Subjects = lazy(() => import('~/pages/subjects/Subjects'))
const Categories = lazy(() => import('~/pages/categories/Categories'))
const FindOffers = lazy(() => import('~/pages/find-offers/FindOffers'))
const OfferDetails = lazy(() => import('~/pages/offer-details/OfferDetails'))
const BookmarkedOffers = lazy(
  () => import('~/pages/bookmarked-offers/BookmarkedOffers')
)
const UserProfile = lazy(() => import('~/pages/user-profile/UserProfile'))
const MyResources = lazy(() => import('~/pages/my-resources/MyResources'))
const MyCourses = lazy(() => import('~/pages/my-courses/MyCourses'))
const CreateOrEditLesson = lazy(
  () => import('~/pages/create-or-edit-lesson/CreateOrEditLesson')
)
const LessonDetails = lazy(() => import('~/pages/lesson-details/LessonDetails'))
const NewQuiz = lazy(() => import('~/pages/new-quiz/NewQuiz'))
const CreateOrEditQuestion = lazy(
  () => import('~/pages/create-or-edit-question/CreateOrEditQuestion')
)
const CreateCourse = lazy(() => import('~/pages/create-course/CreateCourse'))
const Quiz = lazy(() => import('~/pages/quiz/Quiz'))

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
      element={<BookmarkedOffers />}
      handle={{ crumb: [bookmarkedOffers] }}
      path={authRoutes.bookmarkedOffers.route}
    />
    <Route
      element={<UserProfile />}
      handle={{ crumb: userProfile }}
      loader={userProfileLoader}
      path={authRoutes.userProfile.route}
    />
    <Route element={<Chat />} path={authRoutes.chat.route} />
    <Route
      element={<UserProfile />}
      handle={{ crumb: myProfile }}
      path={authRoutes.myProfile.route}
    />
    <Route
      element={<MyCooperations />}
      handle={{ crumb: myCooperations }}
      path={authRoutes.myCooperations.route}
    />
    <Route
      element={<CooperationDetails />}
      handle={{ crumb: [myCooperations, cooperationDetails] }}
      path={authRoutes.cooperationDetails.route}
    />
    <Route
      element={<EditProfile />}
      handle={{ crumb: [myProfile, editProfile] }}
      path={authRoutes.editProfile.route}
    />
    <Route
      element={<MyResources />}
      handle={{ crumb: myResources }}
      path={authRoutes.myResources.root.route}
    />
    <Route
      element={<MyCourses />}
      handle={{ crumb: myCourses }}
      path={authRoutes.myCourses.root.route}
    />
    <Route
      element={<CreateCourse />}
      handle={{ crumb: [myCourses, newCourse] }}
      path={authRoutes.myCourses.newCourse.route}
    />
    <Route
      element={<CreateCourse />}
      handle={{ crumb: [myCourses, editCourse] }}
      path={authRoutes.myCourses.editCourse.route}
    />
    <Route
      element={<CreateOrEditLesson />}
      handle={{ crumb: [myResources, newLesson] }}
      path={authRoutes.myResources.newLesson.route}
    />
    <Route
      element={<CreateOrEditLesson />}
      handle={{ crumb: [myResources, editLesson] }}
      path={authRoutes.myResources.editLesson.route}
    />
    <Route
      element={<LessonDetails />}
      handle={{ crumb: [myResources, lessonDetails] }}
      path={authRoutes.lessonDetails.route}
    />
    <Route
      element={<LessonDetails />}
      handle={{ crumb: [myCooperations, cooperationDetails, lessonDetails] }}
      path={authRoutes.cooperationLessonDetails.route}
    />
    <Route
      element={<NewQuiz />}
      handle={{ crumb: [myResources, newQuiz] }}
      path={authRoutes.myResources.newQuiz.route}
    />
    <Route
      element={<NewQuiz />}
      handle={{ crumb: [myResources, editQuiz] }}
      path={authRoutes.myResources.editQuiz.route}
    />
    <Route
      element={<Quiz />}
      handle={{ crumb: [myCooperations, cooperationDetails, cooperationQuiz] }}
      path={authRoutes.cooperationQuiz.route}
    />
    <Route
      element={<CreateOrEditQuestion />}
      handle={{ crumb: [myResources, newQuestion] }}
      path={authRoutes.myResources.newQuestion.route}
    />
    <Route
      element={<CreateOrEditQuestion />}
      handle={{ crumb: [myResources, editQuestion] }}
      path={authRoutes.myResources.editQuestion.route}
    />
  </Route>
)
