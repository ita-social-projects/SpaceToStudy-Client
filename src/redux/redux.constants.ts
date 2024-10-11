export const sliceNames = {
  cooperations: 'cooperationsSlice',
  snackbar: 'snackbarSlice',
  editProfile: 'editProfileSlice',
  socket: 'socketSlice'
}

export enum LoadingStatusEnum {
  Idle = 'idle',
  Pending = 'pending',
  Fulfilled = 'fulfilled',
  Rejected = 'rejected'
}

export type LoadingStatus =
  | LoadingStatusEnum.Idle
  | LoadingStatusEnum.Pending
  | LoadingStatusEnum.Fulfilled
  | LoadingStatusEnum.Rejected
