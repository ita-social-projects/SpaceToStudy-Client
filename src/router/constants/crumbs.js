import { guestRoutes } from '../constants/guestRoutes'
import { t } from 'i18next'

export const categories = { name: t('breadCrumbs.categories'), path: guestRoutes.categories.route }
export const subjects = { name: t('breadCrumbs.subjects'), path: guestRoutes.subjects.route }
export const findOffers = { name: t('breadCrumbs.findOffers'), path: guestRoutes.findOffers.route }
