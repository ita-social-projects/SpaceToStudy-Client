import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'

import { appApi } from '~/redux/apiSlice'
import appMainReducer from '~/redux/reducer'

export const store = configureStore({
  reducer: {
    appMain: appMainReducer,
    [appApi.reducerPath]: appApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export interface Store extends ToolkitStore {
  dispatch: AppDispatch
}
