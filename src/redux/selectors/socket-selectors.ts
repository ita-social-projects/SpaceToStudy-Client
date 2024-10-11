import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~/redux/store'

export const selectIsUserOnline = (userId: string) =>
  createSelector(
    (state: RootState) => state.socket.usersOnline,
    (usersOnline: string[]) => usersOnline.includes(userId)
  )
