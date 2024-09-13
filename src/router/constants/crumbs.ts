import { authRoutes } from '~/router/constants/authRoutes'
import { guestRoutes } from '~/router/constants/guestRoutes'
import { UserResponse } from '~/types'

export const home = {
  name: 'breadCrumbs.home',
  path: guestRoutes.home.route
}

export const privacyPolicy = {
  name: 'breadCrumbs.privacyPolicy',
  path: guestRoutes.privacyPolicy.route
}

export const myProfile = {
  name: 'breadCrumbs.myProfile',
  path: authRoutes.myProfile.route
}

export const editProfile = {
  name: 'breadCrumbs.editProfile',
  path: authRoutes.editProfile.route
}

export const myCooperations = {
  name: 'breadCrumbs.myCooperations',
  path: authRoutes.myCooperations.route
}

export const cooperationDetails = {
  name: 'breadCrumbs.cooperationDetails',
  path: authRoutes.cooperationDetails.route
}

export const myOffers = {
  name: 'breadCrumbs.myOffers',
  path: authRoutes.myOffers.route
}

export const myRequests = {
  name: 'breadCrumbs.myRequests',
  path: authRoutes.myRequests.route
}

export const categories = {
  name: 'breadCrumbs.categories',
  path: authRoutes.categories.route
}

export const subjects = {
  name: 'breadCrumbs.subjects',
  path: authRoutes.subjects.route
}

export const findOffers = {
  name: 'breadCrumbs.findOffers',
  path: authRoutes.findOffers.route
}

export const offerDetails = {
  name: 'breadCrumbs.offerDetails',
  path: authRoutes.offerDetails.route
}

export const myResources = {
  name: 'breadCrumbs.myResources',
  path: authRoutes.myResources.root.route
}

export const myCourses = {
  name: 'breadCrumbs.myCourses',
  path: authRoutes.myCourses.root.route
}

export const newCourse = {
  name: 'breadCrumbs.newCourse',
  path: authRoutes.myCourses.newCourse.route
}

export const editCourse = {
  name: 'breadCrumbs.editCourse',
  path: authRoutes.myCourses.editCourse.route
}

export const newLesson = {
  name: 'breadCrumbs.newLesson',
  path: authRoutes.myResources.newLesson.route
}

export const editLesson = {
  name: 'breadCrumbs.editLesson',
  path: authRoutes.myResources.editLesson.route
}

export const lessonDetails = {
  name: 'breadCrumbs.lessonDetails',
  path: authRoutes.lessonDetails.route
}

export const newQuiz = {
  name: 'breadCrumbs.newQuiz',
  path: authRoutes.myResources.newQuiz.route
}

export const editQuiz = {
  name: 'breadCrumbs.editQuiz',
  path: authRoutes.myResources.editQuiz.route
}

export const userProfile = ({ data }: { data: UserResponse }) => ({
  name: `${data.firstName} ${data.lastName}`
})

export const newQuestion = {
  name: 'breadCrumbs.newQuestion',
  path: authRoutes.myResources.newQuestion.route
}

export const editQuestion = {
  name: 'breadCrumbs.editQuestion',
  path: authRoutes.myResources.editQuestion.route
}

export const cooperationQuiz = {
  name: 'breadCrumbs.quiz',
  path: authRoutes.cooperationQuiz.route
}

export const bookmarkedOffers = {
  name: 'breadCrumbs.bookmarks',
  path: authRoutes.bookmarkedOffers.route
}
