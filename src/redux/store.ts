import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'

import { appApi } from '~/redux/apiSlice'
import appMainReducer from '~/redux/reducer'
import cooperationsReducer from '~/redux/features/cooperationsSlice'
import snackbarReducer from '~/redux/features/snackbarSlice'
import editProfileReducer from '~/redux/features/editProfileSlice'
import socketReducer from '~/redux/features/socketSlice'
import socketMiddleware from '~/redux/middleware/socket-middleware'

export const store = configureStore({
  reducer: {
    editProfile: editProfileReducer,
    cooperations: cooperationsReducer,
    appMain: appMainReducer,
    snackbar: snackbarReducer,
    socket: socketReducer,
    [appApi.reducerPath]: appApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([appApi.middleware, socketMiddleware])
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
