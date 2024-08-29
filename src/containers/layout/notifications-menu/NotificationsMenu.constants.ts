import { authRoutes } from '~/router/constants/authRoutes'

export const liksByType = {
  NEW_COOPERATION: authRoutes.cooperationDetails.path,
  NEW_COMMENT: authRoutes.userProfile.path,
  UPDATE_COOPERATION: authRoutes.cooperationDetails.path,
  ACCEPT_COOPERATION: authRoutes.cooperationDetails.path,
  CANCEL_COOPERATION: authRoutes.cooperationDetails.path
}
