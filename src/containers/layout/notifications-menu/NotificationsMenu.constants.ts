import { authRoutes } from '~/router/constants/authRoutes'

export const liksByType = {
  NEW_COOPERATION: authRoutes.accountMenu.myCooperations.path,
  NEW_COMMENT: authRoutes.accountMenu.myProfile.path,
  UPDATE_COOPERATION: authRoutes.accountMenu.myCooperations.path,
  ACCEPT_COOPERATION: authRoutes.accountMenu.myCooperations.path,
  CANCEL_COOPERATION: authRoutes.accountMenu.myCooperations.path
}
