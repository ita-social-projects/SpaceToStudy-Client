import { configureStore } from '@reduxjs/toolkit'
import appMainReducer from '~/redux/reducer'

export const store = configureStore({
  reducer: {
    appMain: appMainReducer
  }
})
