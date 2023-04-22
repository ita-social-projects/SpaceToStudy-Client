import { configureStore } from '@reduxjs/toolkit'
import appMainReducer from '~/redux/reducer'

export const store = configureStore({
  reducer: {
    appMain: appMainReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
