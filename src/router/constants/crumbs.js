import { t } from 'i18next'
import { authRoutes } from '~/router/constants/authRoutes'
import { guestRoutes } from '~/router/constants/guestRoutes'

export const home = {
  name: t('breadCrumbs.home'),
  path: guestRoutes.home.route
}

export const privacyPolicy = {
  name: t('breadCrumbs.privacyPolicy'),
  path: guestRoutes.privacyPolicy.route
}

export const myProfile = {
  name: t('breadCrumbs.myProfile'),
  path: authRoutes.accountMenu.myProfile.route
}

export const editProfile = {
  name: t('breadCrumbs.editProfile'),
  path: authRoutes.editProfile.route
}

export const myCooperations = {
  name: t('breadCrumbs.myCooperations'),
  path: authRoutes.accountMenu.myCooperations.route
}

export const myOffers = {
  name: t('breadCrumbs.myOffers'),
  path: authRoutes.accountMenu.myOffers.route
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

export const userProfile = ({ data }) => ({
  name: `${data.firstName} ${data.lastName}`
})

export const chat = {
  name: t('breadCrumbs.chat'),
  path: authRoutes.chat.route
}
