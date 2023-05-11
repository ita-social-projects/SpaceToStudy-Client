import { t } from 'i18next'
import { guestRoutes } from '~/router/constants/guestRoutes'
import { tutorRoutes } from '~/router/constants/tutorRoutes'
import { studentRoutes } from '~/router/constants/studentRoutes'
import { authRoutes } from '~/router/constants/authRoutes'

export const home = {
  name: t('breadCrumbs.home'),
  path: guestRoutes.home.route
}

export const privacyPolicy = {
  name: t('breadCrumbs.privacyPolicy'),
  path: guestRoutes.privacyPolicy.route
}

export const tutorProfile = {
  name: t('breadCrumbs.myProfile'),
  path: tutorRoutes.accountMenu.myProfile.route
}

export const studentProfile = {
  name: t('breadCrumbs.myProfile'),
  path: studentRoutes.accountMenu.myProfile.route
}

export const tutorCooperations = {
  name: t('breadCrumbs.myCooperations'),
  path: tutorRoutes.accountMenu.myCooperations.route
}

export const studentCooperations = {
  name: t('breadCrumbs.myCooperations'),
  path: studentRoutes.accountMenu.myCooperations.route
}

export const categories = {
  name: t('breadCrumbs.categories'),
  path: authRoutes.categories.route
}

export const subjects = {
  name: t('breadCrumbs.subjects'),
  path: authRoutes.subjects.route
}

export const findOffers = {
  name: t('breadCrumbs.findOffers'),
  path: authRoutes.findOffers.route
}

export const offerDetails = {
  name: t('breadCrumbs.offerDetails'),
  path: authRoutes.offerDetails.route
}
