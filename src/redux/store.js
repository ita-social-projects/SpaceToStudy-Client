import { configureStore } from '@reduxjs/toolkit'
import appMainReducer from '~/redux/reducer'
import { setupInterceptors } from '~/services/setup-interceptors'

export const store = configureStore({
  reducer: {
    appMain: appMainReducer
  }
})

setupInterceptors(store)
