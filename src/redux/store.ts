import { configureStore } from '@reduxjs/toolkit'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import appMainReducer from '~/redux/reducer'

export const store = configureStore({
  reducer: {
    appMain: appMainReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export interface Store extends ToolkitStore {
  dispatch: AppDispatch
}
